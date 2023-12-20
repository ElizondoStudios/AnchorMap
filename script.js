function load(){
    fetch("./json/terreno1.json")
    .then(res=> res.json())
    .then(data=>{
        // body
        const body= document.querySelector("body")

        // modal
        const modal= document.querySelector("#modal")
        const botonCerrar= document.querySelector("#boton-cerrar")
        botonCerrar.addEventListener("click", () => {
            modal.close()
        })

        // contenedor
        const container= document.createElement("div")
        let containerWidth= 90
        container.style=`max-width: ${containerWidth}vw; min-width: ${containerWidth}vw;
            height: auto;
            background-image: url('${data.background_image}');
            background-position: center;
            background-repeat: no-repeat;
            background-size: contain;`

        body.appendChild(container)

        //botones zoom
        const botonZoomIn= document.createElement("button")
        botonZoomIn.innerHTML= "+"
        botonZoomIn.classList.add("boton-zoom")
        botonZoomIn.classList.add("boton-zoom-in")
        botonZoomIn.addEventListener("click", () => {
            containerWidth+=10
            container.style=`max-width: ${containerWidth}vw; min-width: ${containerWidth}vw;
                height: auto;
                background-image: url('${data.background_image}');
                background-position: center;
                background-repeat: no-repeat;
                background-size: contain;`
        })
        container.appendChild(botonZoomIn)

        const botonZoomOut= document.createElement("button")
        botonZoomOut.innerHTML= "-"
        botonZoomOut.classList.add("boton-zoom")
        botonZoomOut.classList.add("boton-zoom-out")
        botonZoomOut.addEventListener("click", () => {
            containerWidth-=10
            container.style=`max-width: ${containerWidth}vw; min-width: ${containerWidth}vw;
                height: auto;
                background-image: url('${data.background_image}');
                background-position: center;
                background-repeat: no-repeat;
                background-size: contain;`
        })
        container.appendChild(botonZoomOut)

        // svg
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
        svg.setAttribute("viewBox", `0 0 ${data.background_width} ${data.background_height}`)
        svg.setAttribute("preserveAspectRatio", "xMidYMid meet")
        svg.style=`width: 100%;
            height: 100%;`
        container.appendChild(svg)

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
            polyElement.addEventListener("click", () => {
                modal.showModal()
            })

            // tooltip
            polyElement.addEventListener("mousemove", (e) => {
                const tooltip= document.querySelector(".tooltip")
                tooltip.innerHTML= poly["tooltip"]
                tooltip.style=`visibility: visible; top: ${e.pageY-40}px; left: ${e.pageX+30}px;`
            })

            polyElement.addEventListener("mouseout", () => {
                const tooltip= document.querySelector(".tooltip")
                tooltip.style=`visibility: hidden;`
            })

            svg.appendChild(polyElement)
        });
    })
}