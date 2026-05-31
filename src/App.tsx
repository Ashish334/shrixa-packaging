import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import {
  Package,
  Truck,
  Leaf,
  Palette,
  Shield,
  Factory,
  Recycle,
  Award,
  Users,
  Star,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  ArrowRight,
  CheckCircle2,
  Box,
  Boxes,
  ShoppingCart,
  Printer,
  Container,
  Globe,
  Clock,
  TrendingUp
} from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeProduct, setActiveProduct] = useState<number | null>(null);
  const [boxOpened, setBoxOpened] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setBoxOpened(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white font-['Inter',sans-serif] overflow-x-hidden">
      {/* Navigation */}
      <Navigation scrolled={scrolled} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {/* Hero Section */}
      <HeroSection boxOpened={boxOpened} />

      {/* Products Section */}
      <ProductsSection activeProduct={activeProduct} setActiveProduct={setActiveProduct} />

      {/* Process Section */}
      <ProcessSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Sustainability Section */}
      <SustainabilitySection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
}

function Navigation({ scrolled, isMenuOpen, setIsMenuOpen }: {
  scrolled: boolean;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}) {
  const navLinks = ['Products', 'Process', 'Sustainability', 'Testimonials', 'Contact'];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-slate-900/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl rotate-12 shadow-lg shadow-orange-500/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Box className="w-6 h-6 text-white -rotate-12" />
              </div>
            </div>
            <div>
              <span className={`text-2xl font-bold tracking-tight ${scrolled ? 'text-slate-900' : 'text-slate-900'}`}>
                Shrixa
              </span>
              <span className={`text-2xl font-light ${scrolled ? 'text-orange-500' : 'text-orange-500'}`}>
                Packaging
              </span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                className={`text-sm font-medium transition-colors ${
                  scrolled ? 'text-slate-600 hover:text-slate-900' : 'text-slate-700 hover:text-slate-900'
                }`}
                whileHover={{ y: -2 }}
              >
                {link}
              </motion.a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(249, 115, 22, 0.3)' }}
              whileTap={{ scale: 0.98 }}
              className="relative px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-full shadow-lg shadow-orange-500/25 overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Custom Quote
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-slate-900" />
            ) : (
              <Menu className="w-6 h-6 text-slate-900" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="block text-lg font-medium text-slate-700 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link}
                </a>
              ))}
              <button className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-full mt-4">
                Get Custom Quote
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function HeroSection({ boxOpened }: { boxOpened: boolean }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const floatingIcons = [
    { icon: Truck, delay: 0, position: 'top-20 left-10' },
    { icon: Shield, delay: 0.2, position: 'top-32 right-20' },
    { icon: Leaf, delay: 0.4, position: 'bottom-32 left-20' },
    { icon: Palette, delay: 0.6, position: 'bottom-20 right-16' },
    { icon: Globe, delay: 0.8, position: 'top-60 left-1/4' },
    { icon: Clock, delay: 1, position: 'bottom-48 right-1/4' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-50 via-white to-orange-50/30">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(15, 23, 42, 0.05) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Floating Icons Background */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          className={`absolute ${item.position} hidden lg:block`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ delay: item.delay + 1, duration: 0.8 }}
        >
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 5 + index,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            <item.icon className="w-12 h-12 text-orange-300" strokeWidth={1} />
          </motion.div>
        </motion.div>
      ))}

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-200/40 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-100/50 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-orange-100/30 to-transparent rounded-full blur-3xl" />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100/80 rounded-full text-orange-600 text-sm font-medium mb-6"
            >
              <Award className="w-4 h-4" />
              Trusted by 5000+ Businesses
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 leading-[1.1] tracking-tight mb-6"
            >
              Reliable{' '}
              <span className="relative">
                <span className="relative z-10 bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                  Corrugated
                </span>
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-3 bg-orange-200/50 -rotate-1"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                />
              </span>
              <br />
              Packaging Solutions
              <br />
              <span className="text-slate-600 font-medium">for Every Business</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg sm:text-xl text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Engineered for strength. Designed for sustainability.
              Customized for your brand. Premium corrugated packaging
              that protects your products and elevates your brand.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 25px 50px rgba(249, 115, 22, 0.35)' }}
                whileTap={{ scale: 0.98 }}
                className="relative px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-2xl shadow-xl shadow-orange-500/25 overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Explore Products
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-white text-slate-900 font-semibold rounded-2xl border-2 border-slate-200 hover:border-orange-300 hover:bg-orange-50 transition-all shadow-lg shadow-slate-200/50"
              >
                Get Custom Quote
              </motion.button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-6"
            >
              {[
                { icon: Shield, label: 'ISO Certified' },
                { icon: Leaf, label: 'Eco-Friendly' },
                { icon: Clock, label: 'Fast Delivery' },
              ].map((badge, index) => (
                <div key={index} className="flex items-center gap-2 text-slate-500">
                  <badge.icon className="w-5 h-5 text-orange-500" />
                  <span className="text-sm font-medium">{badge.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* 3D Box Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-lg aspect-square">
              {/* Glowing base */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-64 h-64 bg-gradient-to-br from-orange-400/20 to-orange-600/20 rounded-full blur-3xl"
                />
              </div>

              {/* Main Box */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="relative" style={{ perspective: '1000px' }}>
                  {/* Box Base */}
                  <motion.div
                    className="relative w-64 h-48 sm:w-80 sm:h-60"
                    style={{ transformStyle: 'preserve-3d' }}
                    animate={{ rotateY: boxOpened ? 0 : -5, rotateX: boxOpened ? 0 : 5 }}
                  >
                    {/* Box Front */}
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-100 via-amber-50 to-orange-50 rounded-lg shadow-2xl shadow-slate-900/20 border border-amber-200/50">
                      {/* Cardboard texture pattern */}
                      <div className="absolute inset-0 opacity-30">
                        <div className="absolute inset-0" style={{
                          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139, 92, 42, 0.1) 2px, rgba(139, 92, 42, 0.1) 4px)'
                        }} />
                      </div>

                      {/* Box label */}
                      <div className="absolute inset-4 border-2 border-dashed border-orange-200 rounded flex items-center justify-center">
                        <div className="text-center">
                          <Box className="w-12 h-12 text-orange-400 mx-auto mb-2" />
                          <span className="text-slate-600 font-medium text-sm">SHRIXA PACKAGING</span>
                        </div>
                      </div>
                    </div>

                    {/* Box Flaps */}
                    <motion.div
                      className="absolute -top-12 left-0 right-0 h-12 origin-bottom"
                      initial={{ rotateX: 0 }}
                      animate={{ rotateX: boxOpened ? -120 : 0 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    >
                      <div className="w-full h-full bg-gradient-to-t from-amber-100 to-amber-50 rounded-t-lg border border-amber-200/50 shadow-inner" />
                    </motion.div>

                    <motion.div
                      className="absolute -bottom-12 left-0 right-0 h-12 origin-top"
                      initial={{ rotateX: 0 }}
                      animate={{ rotateX: boxOpened ? 120 : 0 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    >
                      <div className="w-full h-full bg-gradient-to-b from-amber-100 to-amber-50 rounded-b-lg border border-amber-200/50 shadow-inner" />
                    </motion.div>

                    {/* Side Panels */}
                    <div className="absolute -left-4 top-0 bottom-0 w-4 bg-gradient-to-r from-amber-200/80 to-amber-100/50 origin-right" style={{ transform: 'rotateY(-90deg) translateZ(4px)' }} />
                    <div className="absolute -right-4 top-0 bottom-0 w-4 bg-gradient-to-l from-amber-200/80 to-amber-100/50 origin-left" style={{ transform: 'rotateY(90deg) translateZ(4px)' }} />
                  </motion.div>

                  {/* Decorative smaller boxes */}
                  <motion.div
                    className="absolute -top-16 -right-8 w-20 h-16 bg-gradient-to-br from-orange-100 to-orange-50 rounded-lg shadow-xl border border-orange-200/50"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 }}
                    style={{ transform: 'rotateY(-15deg) rotateX(10deg)' }}
                  />

                  <motion.div
                    className="absolute -bottom-12 -left-8 w-24 h-20 bg-gradient-to-br from-slate-100 to-slate-50 rounded-lg shadow-xl border border-slate-200/50"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.4 }}
                    style={{ transform: 'rotateY(15deg) rotateX(-10deg)' }}
                  />

                  <motion.div
                    className="absolute top-10 -right-20 w-16 h-12 bg-gradient-to-br from-amber-100 to-amber-50 rounded shadow-lg border border-amber-200/50"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.6 }}
                    style={{ transform: 'rotateY(-20deg) rotateZ(-5deg)' }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-slate-300 rounded-full flex items-start justify-center p-1"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-3 bg-orange-400 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

function ProductsSection({ activeProduct, setActiveProduct }: {
  activeProduct: number | null;
  setActiveProduct: (index: number | null) => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const products = [
    {
      icon: Boxes,
      title: 'Corrugated Flap Boxes',
      description: 'Heavy-duty corrugated boxes with secure flap closures for maximum protection',
      features: ['3/5/7 Ply Options', 'Custom Sizes', 'High Burst Strength'],
      image: 'https://images.pexels.com/photos/4226896/pexels-photo-4226896.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      icon: Container,
      title: 'Courier Boxes',
      description: 'Lightweight yet durable boxes designed for rapid e-commerce fulfillment',
      features: ['Water-Resistant', 'Self-Locking', 'Tamper-Evident'],
      image: 'https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      icon: ShoppingCart,
      title: 'E-commerce Packaging',
      description: 'Optimized packaging solutions for online retail and direct-to-consumer shipping',
      features: ['Brand Ready', 'Easy Assembly', 'Cost Effective'],
      image: 'https://images.pexels.com/photos/4210612/pexels-photo-4210612.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      icon: Printer,
      title: 'Printed Cartons',
      description: 'Custom printed packaging that transforms your box into a marketing tool',
      features: ['Flexo Printing', 'Offset Printing', 'Full Color'],
      image: 'https://images.pexels.com/photos/6469534/pexels-photo-6469534.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      icon: Shield,
      title: 'Heavy Duty Shipping Boxes',
      description: 'Industrial-grade boxes engineered for maximum load capacity and protection',
      features: ['Double Wall', 'Triple Wall', 'Export Grade'],
      image: 'https://images.pexels.com/photos/4226893/pexels-photo-4226893.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      icon: Package,
      title: 'Custom Packaging',
      description: 'Bespoke packaging solutions tailored to your unique product requirements',
      features: ['Design Support', 'Prototyping', 'Quick Turnaround'],
      image: 'https://images.pexels.com/photos/4210610/pexels-photo-4210610.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
  ];

  return (
    <section id="products" className="py-24 lg:py-32 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-orange-50/50 to-transparent rounded-bl-full" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100/80 rounded-full text-orange-600 text-sm font-medium mb-4"
          >
            <Package className="w-4 h-4" />
            Our Products
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Packaging Solutions for{' '}
            <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              Every Need
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            From lightweight courier boxes to heavy-duty industrial containers,
            we manufacture packaging that protects your products and enhances your brand.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 + 0.3 }}
              onHoverStart={() => setActiveProduct(index)}
              onHoverEnd={() => setActiveProduct(null)}
              className="group relative"
            >
              <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg shadow-slate-200/50 border border-slate-100 hover:border-orange-200 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                  <motion.img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                    animate={{ scale: activeProduct === index ? 1.1 : 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                      <product.icon className="w-5 h-5 text-orange-500" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.features.map((feature, fIndex) => (
                      <span
                        key={fIndex}
                        className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2 text-orange-500 font-semibold text-sm group/link"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const steps = [
    {
      icon: Palette,
      title: 'Design Consultation',
      description: 'Share your requirements and our experts create custom packaging designs tailored to your products'
    },
    {
      icon: Factory,
      title: 'Manufacturing',
      description: 'State-of-the-art production with precision engineering and quality control at every stage'
    },
    {
      icon: Package,
      title: 'Quality Testing',
      description: 'Rigorous testing ensures every box meets industry standards for strength and durability'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Efficient logistics network ensures your packaging reaches you on time, every time'
    }
  ];

  return (
    <section id="process" className="py-24 lg:py-32 bg-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 rounded-full text-orange-400 text-sm font-medium mb-4">
            <Factory className="w-4 h-4" />
            Our Process
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            From Concept to{' '}
            <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
              Delivery
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            A streamlined manufacturing process that ensures quality,
            consistency, and timely delivery for all your packaging needs.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.15 + 0.3 }}
              className="relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-orange-500/50 to-transparent z-0" style={{ width: 'calc(100% - 2rem)' }} />
              )}

              <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-orange-500/50 transition-all duration-300 group">
                {/* Step Number */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-orange-500/30">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-xl flex items-center justify-center mb-4 group-hover:from-orange-500/30 group-hover:to-orange-600/30 transition-all">
                  <step.icon className="w-7 h-7 text-orange-400" />
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Factory Illustration */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-20 grid lg:grid-cols-2 gap-12 items-center"
        >
          <div className="relative">
            <div className="relative bg-gradient-to-br from-slate-800 to-slate-700 rounded-3xl p-8 border border-slate-600/50">
              {/* Industrial illustration */}
              <div className="relative h-64 bg-gradient-to-br from-slate-600/50 to-slate-700/50 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Factory className="w-20 h-20 text-orange-400/50 mx-auto mb-4" />
                    <div className="flex justify-center gap-4">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                        className="w-3 h-3 bg-green-400 rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                        className="w-3 h-3 bg-green-400 rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                        className="w-3 h-3 bg-green-400 rounded-full"
                      />
                    </div>
                    <p className="text-slate-400 mt-4 text-sm">Production Line Active</p>
                  </div>
                </div>

                {/* Conveyor Belt Effect */}
                <motion.div
                  animate={{ x: [-100, 100] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  className="absolute bottom-8 left-0 right-0"
                >
                  <div className="flex gap-4 justify-center">
                    <Box className="w-8 h-8 text-amber-600" />
                    <Box className="w-8 h-8 text-amber-500" />
                    <Box className="w-8 h-8 text-amber-600" />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {[
              '50,000+ sq. ft. manufacturing facility',
              'Automated production lines for precision',
              'In-house quality testing laboratory',
              'Capacity for 10 million boxes per month'
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <span className="text-white text-lg">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const stats = [
    { value: '5000+', label: 'Businesses Served', icon: Users },
    { value: '10M+', label: 'Boxes Manufactured', icon: Box },
    { value: '15+', label: 'Years Experience', icon: Award },
    { value: '98%', label: 'Customer Satisfaction', icon: Star }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
        }} />
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
                className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4"
              >
                <stat.icon className="w-8 h-8 text-white" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="text-4xl lg:text-5xl font-bold text-white mb-2"
              >
                {stat.value}
              </motion.div>
              <div className="text-white/90 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SustainabilitySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const benefits = [
    { icon: Recycle, title: '100% Recyclable', description: 'All our packaging is made from recyclable materials' },
    { icon: Leaf, title: 'Sustainable Sourcing', description: 'FSC certified raw materials from responsible sources' },
    { icon: TrendingUp, title: 'Carbon Neutral', description: 'Committed to reducing our carbon footprint' },
    { icon: Globe, title: 'Eco-Friendly Inks', description: 'Water-based inks safe for the environment' }
  ];

  return (
    <section id="sustainability" className="py-24 lg:py-32 bg-gradient-to-b from-slate-50 to-green-50/30 relative overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full text-green-600 text-sm font-medium mb-4">
              <Leaf className="w-4 h-4" />
              Sustainability
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Packaging That{' '}
              <span className="bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">
                Protects the Planet
              </span>
            </h2>

            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              We believe sustainable packaging shouldn't mean compromising on quality.
              Our eco-friendly solutions help your business reduce environmental impact
              while maintaining the protection your products deserve.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="flex gap-4 p-4 bg-white rounded-xl shadow-sm border border-slate-100"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">{benefit.title}</h3>
                    <p className="text-slate-600 text-sm">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-green-100 to-green-50 rounded-3xl p-8 lg:p-12">
              {/* Central Recycling Illustration */}
              <div className="relative h-80 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute"
                >
                  <Recycle className="w-40 h-40 text-green-300" strokeWidth={1} />
                </motion.div>

                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="relative z-10 w-32 h-32 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl shadow-2xl shadow-green-500/30 flex items-center justify-center"
                >
                  <Leaf className="w-16 h-16 text-white" />
                </motion.div>
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-4 right-4 w-16 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center"
              >
                <Box className="w-8 h-8 text-amber-600" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
                className="absolute bottom-4 left-4 w-16 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center"
              >
                <Package className="w-8 h-8 text-green-600" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: 'Rahul Sharma',
      role: 'Supply Chain Manager',
      company: 'TechMart Electronics',
      content: 'Shrixa Packaging has transformed our fulfillment process. Their corrugated boxes are incredibly durable and have reduced our product damage rate by 85%. The custom branding options have also elevated our unboxing experience.',
      rating: 5
    },
    {
      name: 'Priya Patel',
      role: 'Founder',
      company: 'GreenLeaf Organics',
      content: 'As an eco-conscious brand, finding sustainable packaging was crucial. Shrixa delivered 100% recyclable boxes that align with our values without compromising on quality. Their team understood our vision perfectly.',
      rating: 5
    },
    {
      name: 'Amit Kumar',
      role: 'Operations Director',
      company: 'FastShip Logistics',
      content: 'We ship over 50,000 packages monthly and Shrixa has been our trusted partner for 5 years. Their heavy-duty shipping boxes withstand our rigorous handling while keeping costs competitive. Truly reliable!',
      rating: 5
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-transparent" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100/80 rounded-full text-orange-600 text-sm font-medium mb-4">
            <Star className="w-4 h-4" />
            Testimonials
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Trusted by{' '}
            <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              Industry Leaders
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            See what our customers say about our packaging solutions.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-slate-50 to-white rounded-3xl p-8 lg:p-12 shadow-xl shadow-slate-200/50 border border-slate-100"
            >
              {/* Quote */}
              <div className="mb-8">
                <div className="text-6xl text-orange-200 font-serif leading-none mb-4">"</div>
                <p className="text-lg lg:text-xl text-slate-700 leading-relaxed">
                  {testimonials[activeIndex].content}
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {testimonials[activeIndex].name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">{testimonials[activeIndex].name}</h4>
                    <p className="text-slate-600 text-sm">{testimonials[activeIndex].role}, {testimonials[activeIndex].company}</p>
                  </div>
                </div>

                <div className="flex gap-1">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === activeIndex ? 'bg-orange-500 w-8' : 'bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" className="py-24 lg:py-32 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-orange-50/50 to-transparent rounded-bl-full" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-amber-50/50 to-transparent rounded-tr-full" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-8 lg:p-12 shadow-2xl shadow-slate-200/50 border border-slate-100"
          >
            <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">
              Get a Custom Quote
            </h3>
            <p className="text-slate-600 mb-8">
              Tell us about your packaging needs and we'll get back to you within 24 hours.
            </p>

            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Business Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="john@company.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Company Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="Acme Inc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Packaging Requirements</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                  placeholder="Tell us about your packaging needs, quantities, dimensions, etc."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(249, 115, 22, 0.3)' }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/25 overflow-hidden group relative"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Submit Request
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            </form>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                Let's Build Your Perfect{' '}
                <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                  Packaging
                </span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Whether you need standard boxes or fully customized packaging solutions,
                our team is ready to help. Get in touch today and let's discuss how we can
                protect your products and elevate your brand.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Phone</h4>
                  <p className="text-slate-600">+91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Email</h4>
                  <p className="text-slate-600">sales@shrixapackaging.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Location</h4>
                  <p className="text-slate-600">Industrial Area, Phase 2, Sector 25,<br />New Delhi - 110025, India</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const footerLinks = {
    Products: ['Corrugated Flap Boxes', 'Courier Boxes', 'E-commerce Packaging', 'Printed Cartons', 'Heavy Duty Boxes'],
    Company: ['About Us', 'Our Process', 'Sustainability', 'Careers', 'Blog'],
    Support: ['Contact Us', 'Get Quote', 'Track Order', 'FAQs', 'Shipping Policy'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy']
  };

  return (
    <footer className="bg-slate-900 text-white py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl rotate-12 shadow-lg" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Box className="w-6 h-6 text-white -rotate-12" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-bold tracking-tight text-white">Shrixa</span>
                <span className="text-2xl font-light text-orange-500">Packaging</span>
              </div>
            </div>
            <p className="text-slate-400 mb-6 max-w-sm leading-relaxed">
              Premium corrugated packaging solutions engineered for strength,
              sustainability, and your brand's success.
            </p>
            <div className="flex gap-4">
              {['linkedin', 'twitter', 'facebook'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-orange-500 transition-colors"
                >
                  <Globe className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-lg font-semibold mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            &copy; 2024 Shrixa Packaging. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-slate-400 text-sm">
              <Leaf className="w-4 h-4 text-green-500" />
              Eco-Friendly Packaging
            </span>
            <span className="flex items-center gap-2 text-slate-400 text-sm">
              <Shield className="w-4 h-4 text-orange-500" />
              ISO Certified
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default App;
