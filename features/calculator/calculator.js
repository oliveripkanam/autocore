const initializeGearCalculator = () => {
    const inputTeethSlider = document.getElementById('inputTeeth');
    const outputTeethSlider = document.getElementById('outputTeeth');
    
    if (inputTeethSlider && outputTeethSlider) {
        [inputTeethSlider, outputTeethSlider].forEach(slider => 
            slider.addEventListener('input', updateGearCalculation)
        );
        updateGearCalculation();
    }
};

const updateGearCalculation = () => {
    const inputTeeth = parseInt(document.getElementById('inputTeeth').value);
    const outputTeeth = parseInt(document.getElementById('outputTeeth').value);
    
    document.getElementById('inputValue').textContent = inputTeeth;
    document.getElementById('outputValue').textContent = outputTeeth;
    document.getElementById('inputTeethDisplay').textContent = inputTeeth;
    document.getElementById('outputTeethDisplay').textContent = outputTeeth;
    
    const gearRatio = outputTeeth / inputTeeth;
    
    updateGearResults(inputTeeth, outputTeeth, gearRatio);
    updateGearVisuals(inputTeeth, outputTeeth);
};

const updateGearResults = (inputTeeth, outputTeeth, gearRatio) => {
    const ratioText = gearRatio > 1 ? `1:${gearRatio.toFixed(1)}` : `${(1/gearRatio).toFixed(1)}:1`;
    const speedText = gearRatio > 1 ? `${gearRatio.toFixed(1)}x slower` : `${(1/gearRatio).toFixed(1)}x faster`;
    const torqueText = gearRatio > 1 ? `${gearRatio.toFixed(1)}x stronger` : `${(1/gearRatio).toFixed(1)}x weaker`;
    
    document.getElementById('gearRatio').textContent = ratioText;
    document.getElementById('speedChange').textContent = speedText;
    document.getElementById('torqueChange').textContent = torqueText;
    
    updatePracticalExample(gearRatio);
};

const updatePracticalExample = gearRatio => {
    const examples = [
        [2.5, 'first gear - high torque for starting from a stop or climbing steep hills, but limited top speed'],
        [1.5, 'second or third gear - balanced power and speed for normal driving conditions'],
        [0.8, 'fourth gear - good balance of acceleration and efficiency for highway cruising'],
        [0, 'fifth gear or overdrive - optimized for high-speed efficiency with reduced engine RPM']
    ];
    
    const example = examples.find(([threshold]) => gearRatio > threshold)?.[1] || examples[examples.length - 1][1];
    document.getElementById('practicalExample').innerHTML = `<strong>Real-world example:</strong> Like using ${example}.`;
};

const updateGearVisuals = (inputTeeth, outputTeeth) => {
    const inputGear = document.getElementById('inputGear');
    const outputGear = document.getElementById('outputGear');
    
    if (inputGear && outputGear) {
        const calcSize = teeth => 80 + ((teeth - 10) / 90) * 80;
        const inputSize = calcSize(inputTeeth);
        const outputSize = calcSize(outputTeeth);
        
        inputGear.style.width = inputGear.style.height = `${inputSize}px`;
        outputGear.style.width = outputGear.style.height = `${outputSize}px`;
        
        const gearRatio = outputTeeth / inputTeeth;
        const inputSpeed = 4;
        const outputSpeed = inputSpeed * gearRatio;
        
        inputGear.style.animationDuration = `${inputSpeed}s`;
        outputGear.style.animationDuration = `${outputSpeed}s`;
    }
};

const refreshGearCalculator = () => {
    if (document.getElementById('inputTeeth')) updateGearCalculation();
}; 