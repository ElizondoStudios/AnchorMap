function load(){
    fetch("./json/terreno1.json")
    .then(res=> res.json())
    .then(data=>{
        crearMapa(data, ".container")
    })
}

function crearMapa(data, container_selector){
    // contenedor
    const container= document.querySelector(container_selector)
    container.style="position: relative;"

    // wrapper
    const wrapper= document.createElement("div")
    wrapper.classList.add("wrapper") 
    wrapper.classList.add("perfect-scroll-custom") 
    container.appendChild(wrapper)

    // mapa
    const mapa= document.createElement("div")
    let mapWidth= 90
    mapa.style=`max-width: ${mapWidth}%; min-width: ${mapWidth}%;
        height: auto;
        background-image: url('${data.background_image}');
        transition: all ease-out 0.2s;
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;`

    let isDown= false

    mapa.addEventListener("mousemove", (e) => {
        if(isDown){
            wrapper.scrollLeft-= e.movementX
            wrapper.scrollTop-= e.movementY
        }
    })

    mapa.addEventListener("mousedown", (e) => {
        isDown= true
        mapa.style.cursor= "grabbing"
    })

    mapa.addEventListener("mouseup", (e) => {
        isDown= false
        mapa.style.cursor= "grab"
    })

    mapa.addEventListener("mouseleave", (e) => {
        isDown= false
        mapa.style.cursor= "grab"
    })

    wrapper.appendChild(mapa)

    //botones zoom
    const botonZoomIn= document.createElement("button")
    botonZoomIn.innerHTML= '<i class="fa-solid fa-magnifying-glass-plus"></i>'
    botonZoomIn.classList.add("boton-zoom")
    botonZoomIn.classList.add("boton-zoom-in")
    botonZoomIn.addEventListener("click", () => {
        mapWidth+=20
        mapa.style=`max-width: ${mapWidth}%; min-width: ${mapWidth}%;
            height: auto;
            background-image: url('${data.background_image}');
            transition: all ease-out 0.2s;
            background-position: center;
            background-repeat: no-repeat;
            background-size: contain;`
    })
    container.appendChild(botonZoomIn)

    const botonZoomOut= document.createElement("button")
    botonZoomOut.innerHTML= '<i class="fa-solid fa-magnifying-glass-minus"></i>'
    botonZoomOut.classList.add("boton-zoom")
    botonZoomOut.classList.add("boton-zoom-out")
    botonZoomOut.addEventListener("click", () => {
        mapWidth-=20
        mapa.style=`max-width: ${mapWidth}%; min-width: ${mapWidth}%;
            height: auto;
            background-image: url('${data.background_image}');
            transition: all ease-out 0.2s;
            background-position: center;
            background-repeat: no-repeat;
            background-size: contain;`
    })
    container.appendChild(botonZoomOut)

    const botonZoomReset= document.createElement("button")
    botonZoomReset.innerHTML= '<i class="fa-solid fa-arrows-to-circle"></i>'
    botonZoomReset.classList.add("boton-zoom")
    botonZoomReset.classList.add("boton-zoom-reset")
    botonZoomReset.addEventListener("click", () => {
        mapWidth=90
        mapa.style=`max-width: ${mapWidth}%; min-width: ${mapWidth}%;
            height: auto;
            background-image: url('${data.background_image}');
            transition: all ease-out 0.2s;
            background-position: center;
            background-repeat: no-repeat;
            background-size: contain;`
    })
    container.appendChild(botonZoomReset)

    // svg
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    svg.setAttribute("viewBox", `0 0 ${data.background_width} ${data.background_height}`)
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet")
    svg.style=`width: 100%;
        height: 100%;`
    mapa.appendChild(svg)

    // tooltip
    const tooltip= document.createElement("span")
    tooltip.classList.add("tooltip")
    container.appendChild(tooltip)

    // poligonos
    data.polygons.forEach(poly => {
        const polyElement= document.createElementNS("http://www.w3.org/2000/svg", "polygon")
        polyElement.classList.add(poly.class)
        if(poly["stroke"]){
            polyElement.setAttribute("stroke", poly["stroke"])
        }
        if(poly["fill"]){
            polyElement.setAttribute("fill", poly["fill"])
        }
        polyElement.setAttribute("points", poly["points"])

        // Click event
        polyElement.addEventListener("mousedown", (e) => {
            e.stopImmediatePropagation()
            // Hacer algo
        })
    
        polyElement.addEventListener("mousemove", (e) => {
            tooltip.innerHTML= poly["tooltip"]
            tooltip.style=`visibility: visible; top: ${e.pageY}px; left: ${e.pageX}px;`
        })

        polyElement.addEventListener("mouseout", () => {
            const tooltip= document.querySelector(".tooltip")
            tooltip.style=`visibility: hidden;`
        })

        svg.appendChild(polyElement)
    });
}