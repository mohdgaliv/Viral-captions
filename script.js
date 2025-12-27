// ========================================
// SMOOTH SCROLL & NAVBAR
// ========================================

const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    // Navbar scroll effect
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Back to top button
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

// Back to top functionality
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========================================
// CAPTION & SCRIPT GENERATION LOGIC
// ========================================

const topicInput = document.getElementById('topic-input');
const platformSelect = document.getElementById('platform-select');
const generateCaptionBtn = document.getElementById('generate-caption');
const generateHookBtn = document.getElementById('generate-hook');
const generateScriptBtn = document.getElementById('generate-script');
const generateTagsBtn = document.getElementById('generate-tags');
const outputSection = document.getElementById('output-section');
const outputResults = document.getElementById('output-results');
const outputTitle = document.getElementById('output-title');
const clearBtn = document.getElementById('clear-btn');

// Hindi Caption Templates
const captionTemplates = [
    "📌 {topic} - सब कुछ जो आपको जानना चाहिए! मददगार लगा तो 💬 करें!",
    "🔥 {topic} game बदल रहा है! बाद के लिए save करें। #ContentCreator #Viral",
    "✨ {topic} की ultimate guide! उस दोस्त को tag करें जिसे ये चाहिए 👇",
    "💡 {topic} को आसान बनाया! कौन सी tip आपको सबसे ज्यादा पसंद आई? Comment करें!",
    "🚀 इन proven strategies से {topic} में master बनें! ऐसी और tips के लिए follow करें!"
];

// Hindi Hook Templates
const hookTemplates = [
    "🎯 रुकिए! जानिए क्यों {topic} important है...",
    "❌ हर कोई {topic} में गलती करता है। सच्चाई यहां है:",
    "⚡ अगले 60 seconds में, मैं आपको {topic} दिखाऊंगा",
    "🔥 ये {topic} hack ने मेरी life बदल दी!",
    "💥 {topic} का secret जो कोई नहीं बताता..."
];

// Hindi Script Structure
const scriptStructure = {
    intro: [
        "नमस्कार दोस्तों! आज हम बात करेंगे {topic} के बारे में।",
        "क्या हाल है! इस video में मैं आपको {topic} दिखाऊंगा।",
        "वापस आपका स्वागत है! आज का topic है {topic}, तो चलिए शुरू करते हैं!"
    ],
    body: [
        "सबसे पहले, समझते हैं कि {topic} क्यों important है। कई creators इसमें struggle करते हैं, लेकिन key है consistent रहना और quality पर focus करना quantity से ज्यादा।",
        "अब बात करें {topic} की - यह सब आपकी audience को समझने के बारे में है। एक बार जब आप जान जाएं कि वो क्या चाहते हैं, सब कुछ आसान हो जाता है।",
        "मैं {topic} को simple steps में break down करता हूं। Basics से शुरू करें, regular practice करें, और नए ideas try करने से मत डरें।"
    ],
    outro: [
        "बस इतना ही आज के लिए! अगर यह helpful लगा, तो like और subscribe करना मत भूलें। Comments में अपने questions पूछें!",
        "देखने के लिए धन्यवाद! {topic} के साथ ये tips try करें और मुझे बताएं कैसा रहा। अगली video में मिलते हैं!",
        "उम्मीद है यह आपको {topic} समझने में मदद करेगा! Subscribe button दबाएं और tips के लिए। मिलते हैं!"
    ]
};

// Tags Templates (Hindi + English Mix for SEO)
const tagsTemplates = {
    youtube: [
        '{topic}',
        '{topic} in Hindi',
        '{topic} kaise karein',
        '{topic} tutorial',
        '{topic} tips',
        'content creation',
        'creator tips Hindi',
        'YouTube growth',
        'viral content',
        'digital creator India'
    ],
    reels: [
        '{topic}',
        '{topic}Reels',
        'Reels{topic}',
        'InstagramReels',
        'TrendingReels',
        'ViralReels',
        'ReelsIndia',
        'ContentCreator',
        'CreatorLife',
        'IndianCreator'
    ],
    shorts: [
        '{topic}',
        '{topic}Shorts',
        'YouTubeShorts',
        'Shorts{topic}',
        'ViralShorts',
        'TrendingShorts',
        'ShortsIndia',
        'CreatorTips',
        'HindiShorts',
        'IndianYouTuber'
    ],
    tiktok: [
        '{topic}',
        'TikTok{topic}',
        '{topic}Viral',
        'TikTokIndia',
        'ViralTikTok',
        'TrendingTikTok',
        'FYP',
        'ForYou',
        'ContentCreator',
        'CreatorCommunity'
    ]
};

// Emojis for different platforms
const platformEmojis = {
    youtube: ['🎬', '📺', '▶️', '🎥', '🔔'],
    reels: ['📱', '💃', '🎵', '✨', '🔥'],
    shorts: ['⚡', '🚀', '💥', '🎯', '👀'],
    tiktok: ['🎵', '💃', '🎭', '🌟', '🔥']
};

// ========================================
// GENERATE CAPTIONS (HINDI)
// ========================================

generateCaptionBtn.addEventListener('click', () => {
    const topic = topicInput.value.trim();
    const platform = platformSelect.value;
    
    if (!topic) {
        alert('⚠️ कृपया पहले topic डालें!');
        return;
    }
    
    outputResults.innerHTML = '';
    outputTitle.textContent = '✨ Generated Captions';
    
    // Generate 3 caption variations
    const selectedTemplates = getRandomItems(captionTemplates, 3);
    
    selectedTemplates.forEach((template, index) => {
        const caption = template.replace('{topic}', topic);
        const emoji = platformEmojis[platform][index % platformEmojis[platform].length];
        const finalCaption = `${emoji} ${caption}`;
        
        createResultItem(finalCaption, index);
    });
    
    outputSection.classList.add('active');
    scrollToOutput();
});

// ========================================
// GENERATE HOOKS (HINDI)
// ========================================

generateHookBtn.addEventListener('click', () => {
    const topic = topicInput.value.trim();
    const platform = platformSelect.value;
    
    if (!topic) {
        alert('⚠️ कृपया पहले topic डालें!');
        return;
    }
    
    outputResults.innerHTML = '';
    outputTitle.textContent = '🎯 Generated Hooks';
    
    // Generate 4 hook variations
    const selectedHooks = getRandomItems(hookTemplates, 4);
    
    selectedHooks.forEach((template, index) => {
        const hook = template.replace('{topic}', topic);
        createResultItem(hook, index);
    });
    
    outputSection.classList.add('active');
    scrollToOutput();
});

// ========================================
// GENERATE SCRIPT (HINDI)
// ========================================

generateScriptBtn.addEventListener('click', () => {
    const topic = topicInput.value.trim();
    const platform = platformSelect.value;
    
    if (!topic) {
        alert('⚠️ कृपया पहले topic डालें!');
        return;
    }
    
    outputResults.innerHTML = '';
    outputTitle.textContent = '📝 Generated Script';
    
    // Build complete script
    const intro = getRandomItem(scriptStructure.intro).replace('{topic}', topic);
    const body = getRandomItem(scriptStructure.body).replace('{topic}', topic);
    const outro = getRandomItem(scriptStructure.outro).replace('{topic}', topic);
    
    const script = `
📌 INTRO:
${intro}

🎯 MAIN CONTENT:
${body}

✨ OUTRO:
${outro}

💡 Pro Tip: Naturally बोलें, eye contact maintain करें, और authentic बनाने के लिए अपना personal touch add करें!
    `.trim();
    
    createResultItem(script, 0, true);
    
    outputSection.classList.add('active');
    scrollToOutput();
});

// ========================================
// GENERATE TAGS (NEW FEATURE)
// ========================================

generateTagsBtn.addEventListener('click', () => {
    const topic = topicInput.value.trim();
    const platform = platformSelect.value;
    
    if (!topic) {
        alert('⚠️ कृपया पहले topic डालें!');
        return;
    }
    
    outputResults.innerHTML = '';
    outputTitle.textContent = '🏷️ Generated Tags';
    
    // Get platform-specific tags
    const platformTags = tagsTemplates[platform];
    
    // Replace {topic} with actual topic
    const tags = platformTags.map(tag => tag.replace('{topic}', topic));
    
    // Add some generic trending tags
    const trendingTags = [
        'Trending2024',
        'ViralContent',
        'MustWatch',
        'ContentCreation',
        'CreatorEconomy'
    ];
    
    // Combine all tags
    const allTags = [...tags, ...getRandomItems(trendingTags, 3)];
    
    // Format tags based on platform
    let formattedTags;
    if (platform === 'youtube') {
        // YouTube uses comma-separated tags
        formattedTags = allTags.join(', ');
    } else {
        // Instagram, TikTok use hashtags
        formattedTags = allTags.map(tag => `#${tag.replace(/\s+/g, '')}`).join(' ');
    }
    
    const tagsInfo = `
📍 Platform: ${platform.toUpperCase()}

${platform === 'youtube' ? '🎬 YouTube Tags (comma-separated):' : '📱 Hashtags:'}

${formattedTags}

💡 Tips:
${platform === 'youtube' ? 
    '- ये tags video description या YouTube Studio में paste करें\n- First 3 tags सबसे important होते हैं\n- Mix करें specific और broad tags को' : 
    '- Caption के end में ये hashtags paste करें\n- पहले 3-5 hashtags सबसे ज्यादा effective होते हैं\n- Mix करें trending और niche tags को'}
    `.trim();
    
    createResultItem(tagsInfo, 0, true);
    
    outputSection.classList.add('active');
    scrollToOutput();
});

// ========================================
// HELPER FUNCTIONS
// ========================================

// Create result item with copy button
function createResultItem(text, index, isLong = false) {
    const resultDiv = document.createElement('div');
    resultDiv.className = 'result-item';
    resultDiv.style.animationDelay = `${index * 0.1}s`;
    
    const textP = document.createElement('p');
    textP.className = 'result-text';
    textP.style.whiteSpace = isLong ? 'pre-wrap' : 'normal';
    textP.textContent = text;
    
    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-btn';
    copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy करें';
    copyBtn.onclick = () => copyToClipboard(text, copyBtn);
    
    resultDiv.appendChild(textP);
    resultDiv.appendChild(copyBtn);
    outputResults.appendChild(resultDiv);
}

// Copy to clipboard function
function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(() => {
        const originalHTML = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Copy हो गया!';
        button.classList.add('copied');
        
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        alert('Copy नहीं हो सका। कृपया फिर से try करें!');
        console.error('Copy failed:', err);
    });
}

// Get random item from array
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Get multiple random items from array
function getRandomItems(array, count) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Scroll to output section
function scrollToOutput() {
    setTimeout(() => {
        outputSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest' 
        });
    }, 100);
}

// Clear all results
clearBtn.addEventListener('click', () => {
    outputResults.innerHTML = '';
    outputSection.classList.remove('active');
    topicInput.value = '';
    topicInput.focus();
});

// ========================================
// SCROLL REVEAL ANIMATION
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for animation
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Special animation for first section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '1';
        hero.style.transform = 'translateY(0)';
    }
});

// ========================================
// KEYBOARD SHORTCUTS
// ========================================

document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter to generate caption
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        generateCaptionBtn.click();
    }
    
    // Escape to clear
    if (e.key === 'Escape' && outputSection.classList.contains('active')) {
        clearBtn.click();
    }
});

// ========================================
// FEATURE CARD TILT EFFECT
// ========================================

const featureCards = document.querySelectorAll('.feature-card');

featureCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ========================================
// PLACEHOLDER FOCUS ANIMATION
// ========================================

topicInput.addEventListener('focus', () => {
    topicInput.style.borderColor = 'var(--primary-color)';
    topicInput.style.boxShadow = '0 0 30px rgba(99, 102, 241, 0.4)';
});

topicInput.addEventListener('blur', () => {
    topicInput.style.borderColor = 'rgba(99, 102, 241, 0.3)';
    topicInput.style.boxShadow = 'none';
});

// ========================================
// CONSOLE MESSAGE
// ========================================

console.log('%c👋 नमस्ते Creator!', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cMohd Galiv Gazi द्वारा बनाया गया', 'color: #ec4899; font-size: 14px;');
console.log('%cHappy creating! 🚀', 'color: #10b981; font-size: 14px;');

// ========================================
// AUTO-FOCUS ON PAGE LOAD
// ========================================

window.addEventListener('load', () => {
    setTimeout(() => {
        topicInput.focus();
    }, 500);
});