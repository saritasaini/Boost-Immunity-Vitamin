import { useRef, Suspense, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Text, Decal, useTexture, ContactShadows, Sparkles, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Preload the true GLTF model
useGLTF.preload('/models/bottle.glb');

function BottleModel() {
  const group = useRef();
  const scrollRotationRef = useRef();

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
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);
    texture.anisotropy = 16;
    texture.needsUpdate = true;
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
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);
    texture.anisotropy = 16;
    texture.needsUpdate = true;
    return texture;
  }, []);

  // FRONT TYPOGRAPHY LABEL
  const frontTextTexture = useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 1024, 1024);

    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';

    // boost logo
    ctx.font = '900 135px Inter, sans-serif';
    ctx.fillText('boost', 512, 280);

    // IMMUNITY VITAMIN
    ctx.font = '900 24px Inter, sans-serif';
    ctx.fillText('IMMUNITY VITAMIN', 512, 335);

    // because being sick sucks
    ctx.font = '800 22px Inter, sans-serif';
    ctx.fillText('because being sick sucks', 512, 910);

    // dietary supplement / 60 gummies
    ctx.font = '600 16px Inter, sans-serif';
    ctx.fillText('dietary supplement', 512, 955);
    ctx.fillText('60 gummies', 512, 985);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);
    texture.anisotropy = 16;
    texture.needsUpdate = true;
    return texture;
  }, []);

  // RIGHT SIDE TYPOGRAPHY LABEL
  const rightTextTexture = useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 1024, 1024);

    ctx.fillStyle = 'white';

    // Header paragraph
    ctx.font = '600 17px Inter, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('boost is the first company exclusively', 200, 160);
    ctx.fillText('dedicated to your immune system.', 200, 185);
    ctx.fillText('consider us like hand sanitizer for your', 200, 225);
    ctx.fillText('health.', 200, 250);

    // "So, what's inside?" section title
    ctx.font = '900 26px Inter, sans-serif';
    ctx.fillText("So, what's inside?", 200, 320);

    // Emojis for Vitamin C and Elderberry
    ctx.font = '36px Inter, sans-serif';
    ctx.fillText('🍊', 280, 390);
    ctx.fillText('🍇', 680, 390);

    // Text sub-labels for the ingredients
    ctx.font = '800 16px Inter, sans-serif';
    ctx.fillText('Vitamin C', 245, 435);
    ctx.fillText('Elderberry', 645, 435);

    // Elegant Divider line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(200, 480);
    ctx.lineTo(824, 480);
    ctx.stroke();

    // Directions section
    ctx.font = '700 18px Inter, sans-serif';
    ctx.fillText('Directions:', 200, 525);
    ctx.font = '600 17px Inter, sans-serif';
    ctx.fillText('Step 1. Take 2 gummies.', 315, 525);
    ctx.fillText("Step 2. That's it.", 315, 555);

    // Elegant Divider line
    ctx.beginPath();
    ctx.moveTo(200, 600);
    ctx.lineTo(824, 600);
    ctx.stroke();

    // Contact/Help question section
    ctx.font = '700 17px Inter, sans-serif';
    ctx.fillText('Have a question?', 200, 645);
    ctx.fillText('Text us.', 200, 675);
    
    ctx.font = '900 17px Inter, sans-serif';
    ctx.fillText('(917) 540-8641', 600, 660);

    // Bottom certifications bullet text
    ctx.font = '900 26px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('(V)  (NON GMO)  (GF)', 512, 770);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);
    texture.anisotropy = 16;
    texture.needsUpdate = true;
    return texture;
  }, []);

  const gummyTexture = useTexture('/images/gummy-2.png');
  const barcodeTexture = useTexture('/images/zinc.png');
  
  gummyTexture.colorSpace = THREE.SRGBColorSpace;
  gummyTexture.wrapS = THREE.RepeatWrapping;
  gummyTexture.wrapT = THREE.RepeatWrapping;
  gummyTexture.repeat.set(1, 1);
  gummyTexture.anisotropy = 16;
  gummyTexture.needsUpdate = true;

  barcodeTexture.colorSpace = THREE.SRGBColorSpace;
  barcodeTexture.wrapS = THREE.RepeatWrapping;
  barcodeTexture.wrapT = THREE.RepeatWrapping;
  barcodeTexture.repeat.set(1, 1);
  barcodeTexture.anisotropy = 16;
  barcodeTexture.needsUpdate = true;

  const bottleGroup = useRef();

  // Lerp state
  const bottleCurrentX = useRef(0);
  const bottleTargetX = useRef(0);
  
  const targetRotationY = useRef(0);
  const currentRotationY = useRef(0);
  const scrollRotationY = useRef(0);
  const mouseRotationY = useRef(0);
  
  const DAMPING = 0.055;
  const LOCK_SCROLL = 600;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (bottleGroup.current) {
      bottleGroup.current.position.set(0, 0, 0);
      bottleGroup.current.rotation.set(0, 0, 0);
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const isMobile = window.innerWidth <= 768;
      const CENTER_X = isMobile ? 0 : -25;

      // ── Scroll → continuous Y rotation ──
      scrollRotationY.current = (scrollY / 1200) * Math.PI * 2;
      targetRotationY.current = mouseRotationY.current + scrollRotationY.current;

      // ── Scroll → horizontal translate ──
      const progress = Math.min(scrollY / LOCK_SCROLL, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      bottleTargetX.current = eased * CENTER_X;
    };

    const handleMouseMove = (e) => {
      const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRotationY.current = mouseX * (Math.PI / 8); // max ±22.5°
      targetRotationY.current = mouseRotationY.current + scrollRotationY.current;
    };

    const handleMouseLeave = () => {
      mouseRotationY.current = 0;
      targetRotationY.current = scrollRotationY.current;
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Initial run
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useFrame(() => {
    // Position lerp
    bottleCurrentX.current += (bottleTargetX.current - bottleCurrentX.current) * 0.07;
    const bottleCanvas = document.querySelector('.hero-canvas-container');
    if (bottleCanvas) {
      bottleCanvas.style.transform = `translateX(${bottleCurrentX.current}vw)`;
    }

    // Rotation lerp — Y axis only
    if (bottleGroup.current) {
      currentRotationY.current += (targetRotationY.current - currentRotationY.current) * DAMPING;
      bottleGroup.current.rotation.y = currentRotationY.current;
      bottleGroup.current.rotation.x = 0;
      bottleGroup.current.rotation.z = 0;
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
    <group ref={bottleGroup}>
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
              <Decal position={[0, -0.20, 1.18]} rotation={[0, 0, 0]} scale={[0.55, 0.48, 0.55]} map={gummyTexture} polygonOffsetFactor={-10} depthTest={true} />

              {/* Front Typography Decal */}
              <Decal position={[0, 0.05, 1.18]} rotation={[0, 0, 0]} scale={[1.3, 1.3, 1.3]} map={frontTextTexture} polygonOffsetFactor={-10} depthTest={true} />

              {/* Left Side Supplement Facts Decal */}
              <Decal position={[-1.15, 0.1, 0.3]} rotation={[0, -Math.PI / 2.1, 0]} scale={[1.1, 1.1, 1.1]} map={factsTexture} polygonOffsetFactor={-10} depthTest={true} />

              {/* Right Side Typography Decal */}
              <Decal position={[1.15, 0.1, 0.3]} rotation={[0, Math.PI / 2.1, 0]} scale={[1.3, 1.3, 1.3]} map={rightTextTexture} polygonOffsetFactor={-10} depthTest={true} />

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

      </group>
    </group>
  );
}

export default function Bottle3D() {
  return (
    <div className="absolute inset-0 w-full h-full z-20 pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 8.5], fov: 40 }} 
        className="pointer-events-none" 
        dpr={[1, 2]} 
        shadows 
        performance={{ min: 0.5 }}
        gl={{
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.0,
          outputColorSpace: THREE.SRGBColorSpace
        }}
      >
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
          <BottleModel />
        </Suspense>
      </Canvas>
    </div>
  );
}
