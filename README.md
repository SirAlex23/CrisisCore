# ⚡ CrisisCore — Incident Response Simulator

<div align="center">

![CrisisCore Banner](https://img.shields.io/badge/CrisisCore-Incident%20Response%20Simulator-red?style=for-the-badge&logo=shield&logoColor=white)

**¿Sabrías defender tu empresa ante un ciberataque real?**

Plataforma de entrenamiento en ciberseguridad donde tomas decisiones críticas bajo presión.  
Cada decisión tiene consecuencias. La IA evalúa tu respuesta.

[![Deploy](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://crisiscore.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)

</div>

---

## 🎯 ¿Qué es CrisisCore?

CrisisCore es un simulador de respuesta a incidentes de ciberseguridad diseñado para entrenar a profesionales y estudiantes en la toma de decisiones bajo presión real. A diferencia de los cursos teóricos, CrisisCore te sitúa directamente en el centro del incidente — con un timer corriendo, decisiones que se encadenan y consecuencias inmediatas por cada acción tomada.

Al finalizar cada escenario, una IA real analiza todas tus decisiones y genera un informe personalizado con tu puntuación, nivel de competencia, fortalezas y áreas de mejora.

---

## 🎮 ¿Cómo funciona?

1. **Selecciona un módulo** de ataque entre los 10 disponibles
2. **Elige un escenario** — Básico, Intermedio o Avanzado
3. **Lee el briefing** del incidente con todo el contexto
4. **Toma 6 decisiones críticas** con 60 segundos cada una
5. **Recibe tu evaluación** generada por IA con informe detallado

---

## 🛡️ Módulos disponibles

| Módulo | Escenarios | Descripción |
|--------|-----------|-------------|
| 🔒 Ransomware | 6 | Cifrado de sistemas críticos y extorsión digital |
| 🎣 Phishing Corporativo | 6 | Suplantación de identidad dirigida a empleados clave |
| 💥 Ataque DDoS | 6 | Denegación de servicio distribuido contra infraestructura crítica |
| 📤 Data Breach | 6 | Fuga masiva de datos sensibles de clientes |
| 🧠 Ingeniería Social | 6 | Manipulación psicológica para obtener acceso no autorizado |
| 🌐 Intrusión en Red | 6 | Movimiento lateral de un atacante dentro de la red interna |
| 💉 SQL Injection | 6 | Explotación de vulnerabilidades en bases de datos |
| 🔓 Credential Stuffing | 6 | Uso masivo de credenciales robadas para acceder a cuentas |
| 🕵️ APT | 6 | Amenaza Persistente Avanzada — ataque silencioso a largo plazo |
| 📱 Ataque a Móviles | 6 | Malware y ataques dirigidos a dispositivos móviles corporativos |

**60 escenarios · 360 decisiones · 3 niveles de dificultad**

---

## ✨ Características principales

- 🤖 **Evaluación con IA real** — Groq Llama 3.3 70B analiza cada decisión y genera un informe personalizado
- ⏱️ **Timer de presión** — 60 segundos por decisión para simular el estrés real de un incidente
- 🔀 **Opciones aleatorias** — Las respuestas se barajan en cada sesión para evitar memorización
- 📊 **Informe detallado** — Puntuación, nivel (Experto/Competente/Principiante), fortalezas y áreas de mejora
- 🎯 **3 niveles de dificultad** — Básico, Intermedio y Avanzado por módulo
- 🌑 **Diseño dark mode** — Interfaz inmersiva tipo terminal de operaciones
- 📱 **Responsive** — Funciona en escritorio y móvil

---

## 🚀 Stack tecnológico

| Tecnología | Uso |
|-----------|-----|
| **Next.js 14** | Framework full stack con App Router |
| **TypeScript** | Tipado estático en todo el proyecto |
| **Tailwind CSS 3** | Estilos y diseño responsive |
| **Framer Motion** | Animaciones y transiciones |
| **Groq SDK** | Integración con Llama 3.3 70B para evaluación IA |
| **Vercel** | Deploy y hosting en producción |

---

## 🗂️ Estructura del proyecto

```
src/
├── app/
│   ├── page.tsx                          # Landing principal
│   ├── modulo/[id]/
│   │   ├── page.tsx                      # Lista de escenarios del módulo
│   │   └── escenario/[escenarioId]/
│   │       └── page.tsx                  # Simulación activa
│   └── api/evaluate/
│       └── route.ts                      # Endpoint de evaluación IA
├── components/
│   ├── ResultScreen.tsx                  # Pantalla de resultado con informe IA
│   ├── ModuloCard.tsx                    # Tarjeta de módulo
│   ├── EscenarioCard.tsx                 # Tarjeta de escenario
│   ├── DecisionPanel.tsx                 # Panel de decisión
│   └── TimerBar.tsx                      # Barra de tiempo
└── lib/
    ├── modulos.ts                        # 60 escenarios con 360 decisiones
    └── groq.ts                           # Cliente Groq y generación de informes
```

---

## ⚙️ Instalación local

```bash
# Clonar el repositorio
git clone https://github.com/SirAlex23/CrisisCore.git
cd CrisisCore/crisiscore

# Instalar dependencias
npm install

# Crear archivo de variables de entorno
cp .env.example .env.local
# Añadir tu GROQ_API_KEY en .env.local

# Iniciar en desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 🔑 Variables de entorno

```env
GROQ_API_KEY=tu_api_key_de_groq
```

Obtén tu API key gratuita en [console.groq.com](https://console.groq.com)

---

## 👤 Autor

**Alejandro Crespo** — Junior Developer · Full Stack & Ciberseguridad

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Alejandro%20Crespo-0077b5?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/alejandro-crespo-574958388)
[![GitHub](https://img.shields.io/badge/GitHub-SirAlex23-181717?style=for-the-badge&logo=github)](https://github.com/SirAlex23)

---

<div align="center">

**¿Te atreves a enfrentarte a un ciberataque real?**

[🚀 Probar CrisisCore](https://crisiscore.vercel.app)

</div>
