document.addEventListener('DOMContentLoaded', function() {
    const toggles = document.querySelectorAll('.signal-toggle');
    const scoreDisplay = document.getElementById('score');
    const scoreLabel = document.getElementById('score-label');
    const scoreDescription = document.getElementById('score-description');
    const recommendation = document.getElementById('recommendation');
    const recommendationText = document.getElementById('recommendation-text');
    const resetButton = document.getElementById('reset-button');
    
    function updateScore() {
        let totalScore = 0;
        let activeSignals = [];
        
        toggles.forEach(toggle => {
            if (toggle.checked) {
                const weight = parseInt(toggle.getAttribute('data-weight'));
                totalScore += weight;
                
                // Get signal name
                const signalItem = toggle.closest('.signal-item');
                const signalTitle = signalItem.querySelector('.signal-title').textContent;
                activeSignals.push(signalTitle);
            }
        });
        
        scoreDisplay.textContent = totalScore;
        
        // Update priority label and description
        if (totalScore === 0) {
            scoreLabel.textContent = 'No Priority';
            scoreDescription.textContent = 'Select applicable signals to calculate lead score.';
            recommendation.style.display = 'none';
        } else if (totalScore >= 1 && totalScore <= 4) {
            scoreLabel.textContent = 'Low Priority';
            scoreDescription.textContent = 'This lead shows some buying signals but may not be ready for immediate outreach.';
            recommendation.style.display = 'block';
            recommendationText.textContent = 'Add to nurture sequence with educational content. Check back in 30-60 days for new signals.';
        } else if (totalScore >= 5 && totalScore <= 8) {
            scoreLabel.textContent = 'Medium Priority';
            scoreDescription.textContent = 'This lead shows moderate buying intent and should be monitored closely.';
            recommendation.style.display = 'block';
            recommendationText.textContent = 'Assign to SDR for research and personalized outreach within 1-2 weeks. Focus messaging on their specific signals.';
        } else if (totalScore >= 9) {
            scoreLabel.textContent = 'High Priority';
            scoreDescription.textContent = 'This lead shows strong buying signals and requires immediate attention.';
            recommendation.style.display = 'block';
            recommendationText.textContent = 'Route to top-performing AE for immediate outreach within 24-48 hours. Customize messaging based on signal stack: ' + activeSignals.join(', ');
        }
    }
    
    toggles.forEach(toggle => {
        toggle.addEventListener('change', updateScore);
    });
    
    resetButton.addEventListener('click', function() {
        toggles.forEach(toggle => {
            toggle.checked = false;
        });
        updateScore();
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
