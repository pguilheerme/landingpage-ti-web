/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

function App() {
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const controls = useAnimation();
  const [ref, inView] = useInView();

  const techWords = [
    "Inteligência Artificial",
    "Blockchain",
    "Realidade Aumentada",
    "IoT",
    "Cloud Computing",
  ];
  const backgroundImages = [
    "https://images.unsplash.com/photo-1639762681057-408e52192e55",
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485",
    "https://images.unsplash.com/photo-1626785774573-4b799315345d",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % techWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setFeedback("");
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Seção Hero em Tela Cheia */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background com animação de transição */}
        <div className="absolute inset-0 z-0">
          {backgroundImages.map((img, index) => (
            <motion.div
              key={index}
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${img})`,
                opacity:
                  index === activeIndex % backgroundImages.length ? 1 : 0,
              }}
              initial={{ opacity: 0 }}
              animate={{
                opacity:
                  index === activeIndex % backgroundImages.length ? 1 : 0,
              }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-purple-900/70 to-gray-900/90"></div>
            </motion.div>
          ))}
        </div>

        {Array.from({ length: 30 }, (_, i) => {
          const precision = 3;
          const seed = i;
          function seededRandom(seed: number) {
            const x = Math.sin(seed + 1) * 10000;
            return Number((x - Math.floor(x)).toFixed(precision));
          }
          const width = +(seededRandom(seed) * 8 + 2).toFixed(precision);
          const height = +(seededRandom(seed + 1) * 8 + 2).toFixed(precision);
          const top = +(seededRandom(seed + 2) * 100).toFixed(precision);
          const left = +(seededRandom(seed + 3) * 100).toFixed(precision);
          const opacity = +(0.1 + seededRandom(seed + 4) * 0.2).toFixed(
            precision
          );
          const xMove = +(seededRandom(seed + 5) * 100 - 50).toFixed(precision);
          const duration = +(seededRandom(seed + 6) * 10 + 10).toFixed(
            precision
          );
          const delay = +(seededRandom(seed + 7) * 5).toFixed(precision);

          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: `${width}px`,
                height: `${height}px`,
                top: `${top}%`,
                left: `${left}%`,
                opacity,
              }}
              animate={{
                y: [0, -100],
                x: [0, xMove],
                opacity: [0.3, 0],
              }}
              transition={{
                duration,
                repeat: Infinity,
                ease: "linear",
                delay,
              }}
            />
          );
        })}

        <div className="relative z-10 h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto w-full">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
                  NexusTech
                </span>{" "}
                Solutions
              </h1>

              <div className="h-20 sm:h-24 md:h-28 overflow-hidden relative">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeIndex}
                    className="text-xl sm:text-2xl md:text-3xl text-blue-200 mb-8 max-w-3xl mx-auto lg:mx-0"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    Revolucionando negócios com {techWords[activeIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium py-3 px-8 rounded-lg shadow-lg"
                >
                  Comece Agora
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-transparent hover:bg-white/10 text-white font-medium py-3 px-8 rounded-lg border border-white/30"
                >
                  Saiba Mais
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-6 h-10 border-2 border-blue-400 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-2 bg-blue-400 rounded-full mt-1"
              animate={{
                y: [0, 4, 0],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      </section>

      {/* Seção de Serviços */}
      <section ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-center text-white mb-12"
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6 }}
          >
            Nossos Serviços
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg
                    className="w-10 h-10 text-blue-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm-1.06 13.54L7.4 12l1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41-5.64 5.66z" />
                  </svg>
                ),
                title: "Inteligência Artificial",
                description:
                  "Soluções de IA personalizadas para otimizar seus processos de negócios.",
              },
              {
                icon: (
                  <svg
                    className="w-10 h-10 text-blue-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
                  </svg>
                ),
                title: "Computação em Nuvem",
                description:
                  "Infraestrutura escalável e segura para sua empresa na nuvem.",
              },
              {
                icon: (
                  <svg
                    className="w-10 h-10 text-blue-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11V11.99z" />
                  </svg>
                ),
                title: "Segurança Cibernética",
                description:
                  "Proteção avançada contra ameaças digitais para seus dados sensíveis.",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 rounded-xl p-8 hover:shadow-lg transition-shadow"
                initial="hidden"
                animate={controls}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.6,
                      delay: index * 0.2,
                    },
                  },
                }}
                whileHover={{ y: -10 }}
              >
                <div className="w-20 h-20 mx-auto rounded-full bg-gray-700 flex items-center justify-center mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-400">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção de Feedback */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Deixe Seu Feedback
          </motion.h2>
          <motion.p
            className="text-lg text-gray-300 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Nós valorizamos sua opinião. Conte-nos sobre sua experiência.
          </motion.p>

          {submitted ? (
            <motion.div
              className="bg-green-500 text-white py-4 px-6 rounded-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              Obrigado pelo seu feedback! Sua mensagem foi enviada com sucesso.
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Digite seu feedback aqui..."
                required
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-white placeholder-gray-400"
                rows={5}
              />
              <motion.button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Enviar Feedback
              </motion.button>
            </motion.form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto flex lg:flex-row flex-col justify-between lg:items-center items-start gap-12">
          {/* Contato */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-6 text-cyan-400">
              Contato
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-blue-400 mt-1 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>Av. Tecnológica, 1234 - São Paulo, SP</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-blue-400 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>(11) 98765-4321</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-blue-400 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>contato@nexustech.solutions</span>
              </li>
            </ul>
          </motion.div>

          {/* Redes Sociais */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-6 text-cyan-400">
              Redes Sociais
            </h3>
            <div className="flex space-x-4">
              {[
                {
                  icon: (
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  ),
                  bg: "hover:bg-blue-600",
                  url: "#",
                },
                {
                  icon: (
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  ),
                  bg: "hover:bg-blue-400",
                  url: "#",
                },
                {
                  icon: (
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  ),
                  bg: "hover:bg-blue-700",
                  url: "#",
                },
                {
                  icon: (
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  ),
                  bg: "hover:bg-pink-600",
                  url: "#",
                },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  className={`w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center transition-colors ${social.bg}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="max-w-7xl mx-auto pt-8 mt-8 border-t border-gray-800 text-center text-gray-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p>
            &copy; {new Date().getFullYear()} NexusTech Solutions. Todos os
            direitos reservados.
          </p>
        </motion.div>
      </footer>
    </div>
  );
}

export default App;
