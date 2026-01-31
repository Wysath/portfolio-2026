import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'WORK', href: '/' },
    { label: 'ABOUT', href: '/about' },
    { label: 'CONTACT', href: '/contact' },
  ];

  return (
    <>
      <motion.button
        className="fixed top-8 right-8 z-9000 w-14 h-14 flex flex-col items-center justify-center gap-1.5"
        onClick={() => setIsOpen(!isOpen)}
        data-cursor-hover
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.span
          className="w-8 h-0.5 bg-white"
          animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className="w-8 h-0.5 bg-white"
          animate={{ opacity: isOpen ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className="w-8 h-0.5 bg-white"
          animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-[#0a0a0a] z-8999 flex items-center justify-center"
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav className="flex flex-col gap-6">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  className="overflow-hidden"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                >
                  <Link
                    to={item.href}
                    className="block"
                    onClick={() => setIsOpen(false)}
                    data-cursor-hover
                  >
                    <h2 className="text-[clamp(3rem,6vw,6rem)] font-black tracking-tighter text-white hover:italic transition-all">
                      {item.label}
                    </h2>
                  </Link>
                </motion.div>
              ))}

              <motion.div
                className="mono text-[#a0a0a0] mt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                louna.petitfils@gmail.com
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
