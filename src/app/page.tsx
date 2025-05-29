/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Logo from "@/brand/logo-outlined.jpg";
import Image from "next/image";

function App() {
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const controls = useAnimation();
  const [ref, inView] = useInView();

  const techWords = [
    "Soluções Inovadoras",
    "Tecnologia Avançada",
    "Segurança Digital",
    "Cloud Computing",
    "Inteligência Artificial",
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
              <div className="absolute inset-0 bg-gradient-to-br from-[#02825C]/70 via-[#02825C]/70 to-gray-900/90"></div>
            </motion.div>
          ))}
        </div>

        {/* Partículas animadas */}
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
              className="absolute rounded-full bg-[#DBA00E]"
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

        {/* Barra de navegação com logo */}
        <nav className="relative z-20 py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center">
              {/* Logo - substitua pela sua imagem */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#02825C] rounded-full flex items-center justify-center mr-3">
                  <Image
                    src={Logo}
                    className="rounded-full"
                    width={100}
                    height={100}
                    alt="logo"
                  />
                </div>

                <span className="text-2xl font-bold text-white">
                  SEGURO BET
                </span>
              </div>
            </div>
          </div>
        </nav>

        {/* Conteúdo Principal */}
        <div className="relative z-10 h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto w-full mt-16">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#DBA00E] to-[#f8c537]">
                  SEGURO
                </span>{" "}
                BET
              </h1>

              <div className="h-20 sm:h-24 md:h-28 overflow-hidden relative">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeIndex}
                    className="text-xl sm:text-2xl md:text-3xl text-[#DBA00E] mb-8 max-w-3xl mx-auto lg:mx-0"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    Transformando negócios com {techWords[activeIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="lg:block hidden absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-6 h-10 border-2 border-[#DBA00E] rounded-full flex justify-center">
            <motion.div
              className="w-1 h-2 bg-[#DBA00E] rounded-full mt-1"
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
            className="text-3xl sm:text-4xl font-bold text-center text-[#DBA00E] mb-12"
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
                    className="w-10 h-10 text-[#DBA00E]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm-1.06 13.54L7.4 12l1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41-5.64 5.66z" />
                  </svg>
                ),
                title: "Desenvolvimento de Software",
                description:
                  "Soluções personalizadas para otimizar seus processos de negócios.",
              },
              {
                icon: (
                  <svg
                    className="w-10 h-10 text-[#DBA00E]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
                  </svg>
                ),
                title: "Infraestrutura em Nuvem",
                description:
                  "Soluções escaláveis e seguras para sua empresa na nuvem.",
              },
              {
                icon: (
                  <svg
                    className="w-10 h-10 text-[#DBA00E]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11V11.99z" />
                  </svg>
                ),
                title: "Segurança da Informação",
                description:
                  "Proteção avançada contra ameaças digitais para seus dados sensíveis.",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 rounded-xl p-8 hover:shadow-lg transition-shadow border border-[#02825C]/30 hover:border-[#02825C]/60"
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
                <div className="w-20 h-20 mx-auto rounded-full bg-[#02825C]/10 flex items-center justify-center mb-6">
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#02825C] to-[#01684a]">
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
            className="text-lg text-[#DBA00E] mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Sua opinião nos ajuda a melhorar cada vez mais.
          </motion.p>

          {submitted ? (
            <motion.div
              className="bg-[#DBA00E] text-white py-4 px-6 rounded-lg"
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
                className="w-full px-4 py-3 bg-gray-800/70 border border-[#DBA00E]/50 rounded-lg focus:ring-2 focus:ring-[#DBA00E] focus:border-[#DBA00E] outline-none text-white placeholder-gray-400"
                rows={5}
              />
              <motion.button
                type="submit"
                className="bg-[#DBA00E] hover:bg-[#c4900d] text-white font-medium py-3 px-8 rounded-lg shadow-md"
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
      <footer className="bg-gray-900 text-white pt-16 pb-8 px-4 sm:px-6 lg:px-8 border-t border-[#02825C]/30">
        <div className="max-w-7xl mx-auto flex lg:flex-row flex-col justify-between lg:items-center items-start gap-12">
          {/* Logo e descrição */}
          <div className="max-w-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-[#02825C] rounded-full flex items-center justify-center mr-3">
                <Image
                  src={Logo}
                  className="rounded-full"
                  width={100}
                  height={100}
                  alt="logo"
                />
              </div>
              <span className="text-2xl font-bold text-white">SEGURO BET</span>
            </div>
            <p className="text-gray-400">
              Soluções tecnológicas inovadoras para impulsionar seu negócio na
              era digital.
            </p>
          </div>

          {/* Contato */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-6 text-[#DBA00E]">
              Contato
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-[#02825C] mt-1 mr-3"
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
                <span>
                  Rua Luigi Galvani, 70, Sala 92, Cidade Monções, 04575-020, São
                  Paulo, São Paulo
                </span>
              </li>
              <li>
                <a href="tel:+(85) 99977-7544" className="flex items-center">
                  <svg
                    className="w-5 h-5 text-[#02825C] mr-3"
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
                </a>
              </li>
              <li>
                <a
                  href="mailto:suporte@segurobet.com"
                  className="flex items-center"
                >
                  <svg
                    className="w-5 h-5 text-[#02825C] mr-3"
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
                  <span>suporte@segurobet.com</span>
                </a>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-[#02825C] mt-1 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span>56.268.974/0001-05</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="max-w-7xl mx-auto pt-8 mt-8 border-t border-[#02825C]/30 text-center text-gray-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p>
            &copy; {new Date().getFullYear()} Seguro Bet. Todos os direitos
            reservados.
          </p>
        </motion.div>
      </footer>
    </div>
  );
}

export default App;
