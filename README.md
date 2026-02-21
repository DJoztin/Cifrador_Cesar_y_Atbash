# 🔐 CryptoClásico — Cifrado César & Atbash

Aplicación web interactiva para cifrar y descifrar mensajes usando los métodos de criptografía clásica **César** y **Atbash**, implementada con HTML, CSS y JavaScript puro, sin dependencias externas.

🌐 **[Ver demo en vivo](https://djoztin.github.io/Cifrador_Cesar_y_Atbash/)**

---

## ✨ Características

- 🔠 **Charset personalizable** — define exactamente qué caracteres participan en el cifrado
- 🔢 **Clave de desplazamiento variable** — para César, elige entre 1 y 25
- 📊 **Tabla de sustitución en tiempo real** — visualiza el mapeo carácter a carácter
- 🔒 **Cifrar y descifrar** — ambas operaciones en un solo clic
- 📋 **Copiar resultado** — al portapapeles con un clic

---

## 🛠️ Tecnologías

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

---

## 📖 ¿Cómo funciona?

### Cifrado César
Desplaza cada carácter **N posiciones** dentro del charset definido. Por ejemplo, con desplazamiento 3: `A → D`, `B → E`, etc.

### Cifrado Atbash
Invierte el charset: el primer carácter se intercambia con el último, el segundo con el penúltimo, y así sucesivamente. `A → Z`, `B → Y`, etc.

---

## 🚀 Uso

1. Selecciona el módulo de cifrado (**César** o **Atbash**)
2. Define el conjunto de caracteres a usar
3. Ajusta el desplazamiento (solo César)
4. Ingresa tu mensaje y presiona **Cifrar** o **Descifrar**

---

## 📚 Contexto académico

Proyecto desarrollado para la materia de **Seguridad Informática**. Los cifrados clásicos César y Atbash, aunque históricos, son vulnerables al **análisis de frecuencias**, técnica documentada por el matemático árabe **Al-Kindi** en el siglo IX, considerado el padre del criptoanálisis.

---

## 📄 Licencia

MIT — libre para usar y modificar.
