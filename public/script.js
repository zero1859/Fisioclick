const datosEjercicios = {
    cervical: [
        { name: "Retracción Cervical (Doble mentón)", default: "3 series de 10 reps (Mantener 2 seg al fondo)" },
        { name: "Estiramiento Trapecio Superior", default: "3 series de 20 seg por lado (Sin dolor)" },
        { name: "Rotación activa controlada", default: "2 series de 10 reps fluidas a cada lado" }
    ],
    dorsal: [
        { name: "Extensión Torácica en silla", default: "3 series de 10 reps (Movimiento enfocado arriba)" },
        { name: "Retracción Escapular (Juntar omóplatos)", default: "3 series de 12 reps (Mantener 3 seg)" },
        { name: "Estiramiento en posición de rezo", default: "3 series de 30 segundos" }
    ],
    lumbar: [
        { name: "Estiramiento Gato-Camello", default: "3 series de 10 reps (Despacio y coordinado)" },
        { name: "Puente de Glúteo", default: "3 series de 12 reps (Apretar glúteos arriba)" },
        { name: "Bicho Muerto (Dead Bug) básico", default: "3 series de 8 reps por lado (Control lumbar)" }
    ],
    hombro: [
        { name: "Ejercicios Pendulares de Codman", default: "3 series de 1 minuto (Brazo totalmente relajado)" },
        { name: "Rotación Externa con banda elástica", default: "3 series de 10 reps (Codo pegado al cuerpo)" },
        { name: "Estiramiento de Cápsula Posterior", default: "3 series de 20 segundos cruzando el brazo" }
    ],
    rodilla: [
        { name: "Isométrico de Cuádriceps (Toalla bajo rodilla)", default: "3 series de 10 contracciones de 6 seg" },
        { name: "Elevación de pierna recta (SLR)", default: "3 series de 12 reps (Punta del pie hacia ti)" },
        { name: "Sentadilla isométrica en pared (Wall sit)", default: "3 series de 20 a 30 segundos" }
    ],
    tobillo: [
        { name: "Flexión dorsal con banda elástica", default: "3 series de 15 reps (Regreso lento)" },
        { name: "Equilibrio a una pierna (Propiocepción)", default: "3 series de 30 segundos (Ojos abiertos)" },
        { name: "Elevación de talones (Puntillas)", default: "3 series de 15 reps (Apoyo bilateral)" }
    ],
    muneca: [
        { name: "Estiramiento de Flexores de Muñeca", default: "3 series de 20 segundos (Codo estirado)" },
        { name: "Deslizamiento Tendinoso (Puño a extensión)", default: "2 series de 10 secuencias completas" },
        { name: "Ejercicios de pinza y fuerza de agarre", default: "3 series de 10 reps con pelota suave" }
    ]
};

function cambiarZona() {
    const zone = document.getElementById('zone').value;
    const section = document.getElementById('exercises-section');
    const list = document.getElementById('exercises-list');
    
    list.innerHTML = '';
    if (!zone) {
        section.style.display = 'none';
        return;
    }
    
    section.style.display = 'block';
    datosEjercicios[zone].forEach((ex, idx) => {
        list.innerHTML += `
            <div class="exercise-item">
                <label>
                    <input type="checkbox" class="ex-check" value="${ex.name}"> 
                    <span>${ex.name}</span>
                </label>
                <input type="text" class="ex-desc" value="${ex.default}">
            </div>
        `;
    });
}

function enviarWhatsApp() {
    const phone = document.getElementById('phone').value.trim();
    const zone = document.getElementById('zone').value;
    
    if (!phone || !zone) {
        alert("Por favor introduce el número de WhatsApp del paciente y selecciona una zona.");
        return;
    }
    
    const items = document.querySelectorAll('.exercise-item');
    let mensaje = `*PLAN DE EJERCICIOS CASEROS* 🩺\n*Fisioterapeuta:* Lic. Edwin Villarreal Gomez\n\n`;
    mensaje += `🦴 *Zona clínica a tratar:* ${zone.toUpperCase()}\n\n`;
    let algunoSeleccionado = false;

    items.forEach(item => {
        const cb = item.querySelector('.ex-check');
        const desc = item.querySelector('.ex-desc').value;
        if (cb.checked) {
            mensaje += `✅ *${cb.value}*\n   ⚙️ *Dosis/Indicación:* ${desc}\n\n`;
            algunoSeleccionado = true;
        }
    });

    if (!algunoSeleccionado) {
        alert("Debes marcar al menos un ejercicio clínico de la lista antes de enviar.");
        return;
    }

    mensaje += `⚠️ *Nota de seguridad:* Si presentas dolor agudo, mareo o molestia inusual, suspende la actividad inmediatamente.\n\n¡Nos vemos en tu siguiente sesión de terapia! 👋`;
    
    const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}
