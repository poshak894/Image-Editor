let filters = {
    brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%",
    },
    contrast: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%",
    },
    saturation: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%",
    },
    hueRotation: {
        value: 0,
        min: 0, 
        max: 360,
        unit: "deg",
    },
    blur: {
        value: 0,
        min: 0,
        max: 20,
        unit: "px"
    },
    grayscale: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%",
    },
    sepia: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%",
    },
    opacity: {
        value: 100,
        min: 0,
        max: 100,
        unit: "%",
    },
    invert: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%",
    },
}

const imageCanvas = document.querySelector("#image-canvas")
const imageInput = document.querySelector("#img-input")
const canvasCtx = imageCanvas.getContext("2d")
let file = null
let image = null
const resetButton = document.querySelector("#reset-btn")
const downloadButton = document.querySelector("#download-btn")
const presetsContainer = document.querySelector(".presets")

const filtersContainer = document.querySelector(".filters")

function createFilterElement(name, unit = "%", value, min, max){

    const div = document.createElement("div")
    div.classList.add("filter")

    const input = document.createElement("input")
    input.type = "range"
    input.min = min
    input.max = max
    input.value = value
    input.id = name

    const p = document.createElement("p")
    p.innerText = name

    div.appendChild(p)
    div.appendChild(input)

    input.addEventListener("input", (event) => {
        filters[ name ].value = input.value;
        applyFilters();
    })

    return div
}

function createFilters(){
    Object.keys(filters).forEach(key => {

    const filterElement = createFilterElement(key, filters [ key ].unit, filters [ key ].value, filters [ key ].min, filters[ key ].max)
    
    filtersContainer.appendChild(filterElement);
    })
}

createFilters();

imageInput.addEventListener("change", (event) => {

    file = event.target.files[ 0 ]
    const imagePlaceHolder = document.querySelector(".placeholder")
    imageCanvas.style.display = "block";
    imagePlaceHolder.style.display = "none";

    const img = new Image()
    img.src = URL.createObjectURL(file)

    img.onload = () => {
        image = img
        imageCanvas.width = img.width;
        imageCanvas.height = img.height;
        canvasCtx.drawImage(img, 0, 0)
    }


})

function applyFilters(){
    canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height)
    canvasCtx.filter = `
    brightness(${filters.brightness.value}${filters.brightness.unit})
    contrast(${filters.contrast.value}${filters.contrast.unit})
    saturate(${filters.saturation.value}${filters.saturation.unit})
    hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})
    blur(${filters.blur.value}${filters.blur.unit})
    grayscale(${filters.grayscale.value}${filters.grayscale.unit})
    sepia(${filters.sepia.value}${filters.sepia.unit})
    opacity(${filters.opacity.value}${filters.opacity.unit})
    invert(${filters.invert.value}${filters.invert.unit})
    `.trim()
    canvasCtx.drawImage(image, 0, 0)
}

resetButton.addEventListener("click", () => {
    filters = {
    brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%",
    },
    contrast: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%",
    },
    saturation: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%",
    },
    hueRotation: {
        value: 0,
        min: 0, 
        max: 360,
        unit: "deg",
    },
    blur: {
        value: 0,
        min: 0,
        max: 20,
        unit: "px"
    },
    grayscale: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%",
    },
    sepia: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%",
    },
    opacity: {
        value: 100,
        min: 0,
        max: 100,
        unit: "%",
    },
    invert: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%",
    },
    }
    applyFilters();

    filtersContainer.innerHTML = ""
    createFilters();
})

downloadButton.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "edited-image.png";
    link.href = imageCanvas.toDataURL();
    link.click();
})

const presets = {
    drama: {
        brightness: 115,
        contrast: 150,
        saturation: 140,
        hueRotation: 0,
        blur: 0,
        grayscale: 0,
        sepia: 10,
        opacity: 100,
        invert: 0,
    },

    oldSchool: {
        brightness: 105,
        contrast: 125,
        saturation: 75,
        hueRotation: 8,
        blur: 0,
        grayscale: 12,
        sepia: 45,
        opacity: 100,
        invert: 0,
    },

    vintage: {
        brightness: 112,
        contrast: 92,
        saturation: 65,
        hueRotation: 15,
        blur: 1,
        grayscale: 18,
        sepia: 55,
        opacity: 100,
        invert: 0,
    },

    cool: {
        brightness: 100,
        contrast: 115,
        saturation: 125,
        hueRotation: 210,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0,
    },

    bw: {
        brightness: 120,
        contrast: 140,
        saturation: 0,
        hueRotation: 0,
        blur: 0,
        grayscale: 100,
        sepia: 0,
        opacity: 100,
        invert: 0,
    },

    warm: {
        brightness: 110,
        contrast: 105,
        saturation: 130,
        hueRotation: 25,
        blur: 0,
        grayscale: 0,
        sepia: 15,
        opacity: 100,
        invert: 0,
    },

    sunset: {
        brightness: 108,
        contrast: 115,
        saturation: 150,
        hueRotation: 35,
        blur: 0,
        grayscale: 0,
        sepia: 20,
        opacity: 100,
        invert: 0,
    },

    night: {
        brightness: 80,
        contrast: 130,
        saturation: 90,
        hueRotation: 220,
        blur: 1,
        grayscale: 10,
        sepia: 0,
        opacity: 100,
        invert: 0,
    },

    soft: {
        brightness: 115,
        contrast: 90,
        saturation: 105,
        hueRotation: 0,
        blur: 2,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0,
    },

    pop: {
        brightness: 120,
        contrast: 160,
        saturation: 170,
        hueRotation: 0,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0,
    },

    sepiaBoost: {
        brightness: 110,
        contrast: 110,
        saturation: 80,
        hueRotation: 10,
        blur: 0,
        grayscale: 10,
        sepia: 80,
        opacity: 100,
        invert: 0,
    },

    fade: {
        brightness: 125,
        contrast: 75,
        saturation: 85,
        hueRotation: 0,
        blur: 1,
        grayscale: 5,
        sepia: 10,
        opacity: 100,
        invert: 0,
    }
};

Object.keys(presets).forEach(presetName => {
    const presetButton = document.createElement("button")
    presetButton.classList.add("btn")
    presetButton.innerText = presetName
    presetsContainer.appendChild(presetButton)

    presetButton.addEventListener("click", () => {
        const preset = presets[ presetName ]

        Object.keys(preset).forEach(filterName => {
            filters[ filterName ].value = preset[ filterName ]
        })  
        applyFilters();
        filtersContainer.innerHTML = ""
        createFilters()
    })
})
