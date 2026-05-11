import { useRef, Suspense, useMemo, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Text, Decal, useTexture, ContactShadows, Sparkles, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Preload the true GLTF model
useGLTF.preload('/models/bottle.glb');

const BottleModel = forwardRef((props, ref) => {
  const group = useRef();
  const scrollRotationRef = useRef();

  useImperativeHandle(ref, () => ({
    get rotation() {
      return scrollRotationRef.current ? scrollRotationRef.current.rotation : { y: 0 };
    }
  }));

  // Robustly load nodes from the verified GLB
  const { nodes } = useGLTF('/models/bottle.glb');

  // Select meshes regardless of internal GLTF naming conventions
  const meshes = useMemo(() => Object.values(nodes).filter(n => n.isMesh), [nodes]);
  const bodyMesh = meshes[0];
  const rimMesh = meshes[1];
  const capMesh = meshes[2];

  // Generate dynamic vertical grooves for the cap
  const capBumpMap = useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const context = canvas.getContext('2d');
    context.fillStyle = '#888888';
    context.fillRect(0, 0, 512, 512);
    // Create many thin, sharp vertical lines for premium ribbing
    for (let i = 0; i < 512; i += 2) {
      context.fillStyle = i % 4 === 0 ? '#ffffff' : '#444444';
      context.fillRect(i, 0, 1, 512);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.anisotropy = 16;
    return texture;
  }, []);

  // SUPPLEMENT FACTS LABEL (Canvas Texture for Sharpness)
  const factsTexture = useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 1024, 1024);

    // Border
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 6;
    ctx.strokeRect(50, 50, 924, 924);

    ctx.fillStyle = 'white';
    ctx.font = '900 85px Inter, sans-serif';
    ctx.fillText('Supplement Facts', 80, 150);

    ctx.font = '500 40px Inter, sans-serif';
    ctx.fillText('Serving Size', 80, 220);
    ctx.textAlign = 'right'; ctx.fillText('2 Gummies', 944, 220); ctx.textAlign = 'left';
    ctx.fillText('Servings Per Container', 80, 270);
    ctx.textAlign = 'right'; ctx.fillText('30', 944, 270); ctx.textAlign = 'left';

    ctx.fillRect(80, 300, 864, 15); // Thick line

    ctx.font = '900 45px Inter, sans-serif';
    ctx.fillText('Amount Per Serving', 80, 370);
    ctx.fillRect(80, 390, 864, 5); // Thin line

    const rows = [
      ['Calories', '38', ''],
      ['Total Carbohydrate', '4g', '1%*'],
      ['  Sugars', '3g', '†'],
      ['Vitamin C (as Ascorbic Acid)', '100mg', '111%'],
      ['Zinc', '10g', '91%'],
      ['Elderberry Extract', '150mg', '†'],
      ['Sodium', '6mg', '†']
    ];

    let y = 460;
    ctx.font = '500 38px Inter, sans-serif';
    rows.forEach(row => {
      ctx.fillText(row[0], 80, y);
      ctx.textAlign = 'right';
      ctx.fillText(row[1], 800, y);
      ctx.fillText(row[2], 944, y);
      ctx.textAlign = 'left';
      ctx.fillRect(80, y + 20, 864, 2);
      y += 70;
    });

    ctx.font = 'italic 28px Inter, sans-serif';
    ctx.fillText('* Percent Daily Values are based on a 2,000 calorie diet.', 80, 920);
    ctx.fillText('† Daily Value not established.', 80, 960);

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 16;
    return texture;
  }, []);

  // FDA DISCLAIMER & BARCODE LABEL
  const backLabelTexture = useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 1024, 1024);
    ctx.fillStyle = 'white';

    // Vertical FDA Disclaimer (Bordered box)
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 4;
    ctx.strokeRect(300, 100, 150, 800);

    ctx.save();
    ctx.translate(375, 500);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    ctx.font = '500 24px Inter, sans-serif';
    ctx.fillText('*These statements have not been evaluated by the Food and Drug Administration.', 0, -20);
    ctx.fillText('This product is not intended to diagnose, treat, cure or prevent any disease.', 0, 15);
    ctx.restore();

    // Barcode (Simulated)
    ctx.fillRect(500, 650, 400, 200);
    ctx.fillStyle = 'black';
    ctx.fillRect(505, 655, 390, 190);
    ctx.fillStyle = 'white';
    ctx.fillRect(510, 660, 380, 150);
    ctx.fillStyle = 'black';
    for (let i = 515; i < 880; i += Math.random() * 8 + 2) {
      ctx.fillRect(i, 665, Math.random() * 5 + 1, 140);
    }
    ctx.textAlign = 'center';
    ctx.font = 'bold 24px Inter, sans-serif';
    ctx.fillText('7  23314  56425  8', 700, 840);

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 16;
    return texture;
  }, []);

  const gummyTexture = useTexture('/images/gummy-2.png');
  const barcodeTexture = useTexture('/images/zinc.png');
  gummyTexture.anisotropy = 16;
  barcodeTexture.anisotropy = 16;

  const targetRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      targetRotation.current.x = x * Math.PI / 16; // subtle mouse rotation
      targetRotation.current.y = 0; // No tilt
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (group.current) {
      // Add subtle mouse-follow rotation on top of scroll rotation
      group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetRotation.current.x, 3, delta);
      group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, 0, 3, delta);
    }
  });

  const materialProps = {
    color: "#ff7300", // warmer, brighter orange matching reference
    roughness: 0.35,  // smooth matte sheen
    metalness: 0.05,
    clearcoat: 0.05,
    clearcoatRoughness: 0.6,
    transmission: 0.0,
    thickness: 1,
    ior: 1.5,
  };

  return (
    <group ref={scrollRotationRef}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <group ref={group} dispose={null} scale={0.75} position={[0, -0.5, 0]}>

          {/* --- CAP --- */}
          {capMesh && (
            <mesh geometry={capMesh.geometry} castShadow receiveShadow scale={[0.88, 1, 0.88]} position={[0, 0.15, 0]}>
              <meshPhysicalMaterial 
                color="#ffffff" 
                roughness={0.4} 
                metalness={0.1} 
                bumpMap={capBumpMap} 
                bumpScale={0.08} 
                clearcoat={0.3}
              />
            </mesh>
          )}

          {/* --- BODY --- */}
          {bodyMesh && (
            <mesh geometry={bodyMesh.geometry} castShadow receiveShadow scale={[1, 1.12, 1]}>
              <meshPhysicalMaterial {...materialProps} />

              {/* Front Gummy Bear Decal */}
              <Decal position={[0, -0.22, 1.18]} rotation={[0, 0, 0]} scale={[0.55, 0.48, 0.55]} map={gummyTexture} polygonOffsetFactor={-10} depthTest={true} />

              {/* Left Side Supplement Facts Decal */}
              <Decal position={[-1.15, 0.1, 0.3]} rotation={[0, -Math.PI / 2.1, 0]} scale={[1.1, 1.1, 1.1]} map={factsTexture} polygonOffsetFactor={-10} depthTest={true} />

              {/* Back Side FDA & Barcode Decal */}
              <Decal position={[0, 0.1, -1.18]} rotation={[0, Math.PI, 0]} scale={[1.2, 1.2, 1.2]} map={backLabelTexture} polygonOffsetFactor={-10} depthTest={true} />
            </mesh>
          )}

          {/* --- RIM --- */}
          {rimMesh && (
            <mesh geometry={rimMesh.geometry} position={[0, 1.62, 0]} castShadow>
              <meshPhysicalMaterial color="#4b0082" roughness={0.3} metalness={0.2} clearcoat={0.1} />
            </mesh>
          )}

          {/* --- CAP TOP --- */}
          {capMesh && (
            <mesh geometry={capMesh.geometry} position={[0, 1.85, 0]} castShadow>
              <meshPhysicalMaterial color="#ffffff" roughness={0.6} metalness={0.1} clearcoat={0.1} bumpMap={capBumpMap} bumpScale={0.015} />
            </mesh>
          )}

        {/* --- TYPOGRAPHY --- */}
        {/* Front: Logo, Subtitle, and Bottom Text */}
        <group rotation={[0, 0, 0]}>
          <Text
            curveRadius={1.25}
            position={[0, 0.40, 1.25]}
            fontSize={0.38}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            letterSpacing={-0.02}
            fontWeight="900"
            sdfGlyphSize={128}
            polygonOffset
            polygonOffsetFactor={-20}
            material-toneMapped={false}
            material-depthTest={false}
            outlineWidth={0.015}
            outlineColor="#ffffff"
            outlineOpacity={0.4}
          >
            boost
          </Text>
          <Text
            curveRadius={1.25}
            position={[0, 0.15, 1.25]}
            fontSize={0.055}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.18}
            fontWeight="800"
            sdfGlyphSize={64}
            polygonOffset
            polygonOffsetFactor={-20}
            material-toneMapped={false}
          >
            IMMUNITY VITAMIN
          </Text>
          <Text
            curveRadius={1.25}
            position={[0, -0.65, 1.25]}
            fontSize={0.05}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            fontWeight="800"
            sdfGlyphSize={64}
            polygonOffset
            polygonOffsetFactor={-20}
            material-toneMapped={false}
          >
            because being sick sucks
          </Text>
          <Text
            curveRadius={1.25}
            position={[0, -0.74, 1.25]}
            fontSize={0.034}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            sdfGlyphSize={64}
            lineHeight={1.2}
            polygonOffset
            polygonOffsetFactor={-20}
            material-toneMapped={false}
            textAlign="center"
          >
            dietary supplement{"\n"}60 gummies
          </Text>
        </group>

        {/* Right Side: Info and Icons */}
        <group rotation={[0, Math.PI / 2.2, 0]}>

          <group position={[0, 0.45, 0]}>
            <Text
              curveRadius={1.25}
              position={[0, 0, 1.25]}
              fontSize={0.036}
              color="#ffffff"
              anchorX="center"
              anchorY="top"
              maxWidth={0.7}
              textAlign="left"
              sdfGlyphSize={64}
              polygonOffset
              polygonOffsetFactor={-20}
              material-toneMapped={false}
            >
              boost is the first company exclusively{"\n"}dedicated to your immune system.{"\n\n"}consider us like hand sanitizer for your{"\n"}health.
            </Text>
          </group>

          <group position={[0, 0.08, 0]}>
            <Text
              curveRadius={1.25}
              position={[0, 0, 1.25]}
              fontSize={0.052}
              color="#ffffff"
              anchorX="center"
              anchorY="top"
              fontWeight="900"
              sdfGlyphSize={64}
              polygonOffset
              polygonOffsetFactor={-20}
              material-toneMapped={false}
            >
              So, what's inside?
            </Text>

            {/* Icons Simulation */}
            <Text curveRadius={1.25} position={[-0.15, -0.12, 1.25]} fontSize={0.055} color="#ffffff" polygonOffset polygonOffsetFactor={-20} material-toneMapped={false}>🍊</Text>
            <Text curveRadius={1.25} position={[0.15, -0.12, 1.25]} fontSize={0.055} color="#ffffff" polygonOffset polygonOffsetFactor={-20} material-toneMapped={false}>🍇</Text>

            <Text
              curveRadius={1.25}
              position={[0, -0.20, 1.25]}
              fontSize={0.034}
              color="#ffffff"
              anchorX="center"
              anchorY="top"
              sdfGlyphSize={64}
              polygonOffset
              polygonOffsetFactor={-20}
              material-toneMapped={false}
            >
              Vitamin C          Elderberry
            </Text>

            <Text
              curveRadius={1.25}
              position={[0, -0.30, 1.25]}
              fontSize={0.03}
              color="#ffffff"
              anchorX="center"
              anchorY="top"
              polygonOffset
              polygonOffsetFactor={-20}
              opacity={0.3}
              material-toneMapped={false}
            >
              ---------------------------------------------------------
            </Text>

            <Text
              curveRadius={1.25}
              position={[0, -0.37, 1.25]}
              fontSize={0.036}
              color="#ffffff"
              anchorX="center"
              anchorY="top"
              textAlign="left"
              sdfGlyphSize={64}
              polygonOffset
              polygonOffsetFactor={-20}
              material-toneMapped={false}
            >
              Directions:    Step 1. Take 2 gummies.{"\n"}                     Step 2. That's it.
            </Text>

            <Text
              curveRadius={1.25}
              position={[0, -0.50, 1.25]}
              fontSize={0.03}
              color="#ffffff"
              anchorX="center"
              anchorY="top"
              polygonOffset
              polygonOffsetFactor={-20}
              opacity={0.3}
              material-toneMapped={false}
            >
              ---------------------------------------------------------
            </Text>

            <Text
              curveRadius={1.25}
              position={[-0.1, -0.60, 1.25]}
              fontSize={0.036}
              color="#ffffff"
              anchorX="center"
              anchorY="top"
              textAlign="left"
              sdfGlyphSize={64}
              polygonOffset
              polygonOffsetFactor={-20}
              material-toneMapped={false}
            >
              Have a question?{"\n"}Text us.
            </Text>
            <Text curveRadius={1.25} position={[0.18, -0.65, 1.25]} fontSize={0.032} color="#ffffff" polygonOffset polygonOffsetFactor={-20} material-toneMapped={false} fontWeight="700">(917) 540-8641</Text>
          </group>

          <group position={[0, -0.88, 0]}>
            <Text
              curveRadius={1.25}
              position={[0, 0, 1.25]}
              fontSize={0.058}
              color="#ffffff"
              anchorX="center"
              anchorY="top"
              fontWeight="900"
              sdfGlyphSize={64}
              polygonOffset
              polygonOffsetFactor={-20}
              letterSpacing={0.12}
              material-toneMapped={false}
            >
              (V) (NON GMO) (GF)
            </Text>
          </group>
        </group>
        </group>
      </Float>
    </group>
  );
});

export default forwardRef(function Bottle3D(props, ref) {
  return (
    <div className="absolute inset-0 w-full h-full z-20 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8.5], fov: 40 }} className="pointer-events-none" dpr={[1, 2]} shadows performance={{ min: 0.5 }}>
        {/* Cinematic Studio Lighting Setup */}
        <ambientLight intensity={0.8} />

        {/* Main Key Light - Warm & Strong */}
        <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={2.5} castShadow shadow-bias={-0.0001} color="#ffffff" />

        {/* Secondary Fill Light - Cool */}
        <spotLight position={[-10, 5, 5]} angle={0.5} penumbra={1} intensity={1.5} color="#cbd5e1" />

        {/* Back Rim Light - Vibrant Orange */}
        <pointLight position={[0, 5, -5]} intensity={3} color="#ff710d" />

        {/* Soft HDRI Environment for realistic reflections */}
        <Environment preset="studio" environmentIntensity={0.6} />



        {/* Subtle Floating Particles */}
        {typeof window !== 'undefined' && window.innerWidth > 768 && (
          <Sparkles count={30} scale={8} size={2} speed={0.4} opacity={0.15} color="#ffffff" />
        )}

        <Suspense fallback={null}>
          <BottleModel ref={ref} />
        </Suspense>
      </Canvas>
    </div>
  );
});
