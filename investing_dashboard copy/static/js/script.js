document.addEventListener('DOMContentLoaded', function () {
    // Load default symbol
    const defaultSymbol = 'NASDAQ:AAPL'; // Default to AAPL
    loadStockChart(defaultSymbol);
    loadTechnicalAnalysis(defaultSymbol);

    const loadButton = document.getElementById('load-stock');

    loadButton.addEventListener('click', () => {
        const symbol = document.getElementById('stock-symbol').value.toUpperCase().trim();
        if (symbol) {
            clearExistingWidgets(); // Clear the widgets first
            loadStockChart(symbol);
            loadTechnicalAnalysis(symbol);
        }
    });

    // Function to load the stock chart widget
    function loadStockChart(symbol) {
        const widgetContainer = document.getElementById('tradingview-widget');
        widgetContainer.innerHTML = '';  // Clear any existing widget
        widgetContainer.style.height = 'auto';  // Reset height to prevent gaps

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js`;
        script.async = true;

        script.innerHTML = JSON.stringify({
            "width": "100%",
            "height": "700",  // Make sure height is set properly
            "symbol": symbol,
            "timezone": "America/New_York",
            "theme": "dark",
            "style": "3",
            "locale": "en",
            "withdateranges": true,
            "range": "YTD",
            "allow_symbol_change": true,
            "container_id": "tradingview-widget",
            "calendar": false,
            "support_host": "https://www.tradingview.com"
        });

        widgetContainer.appendChild(script);
    }

    // Function to load the technical analysis widget
    function loadTechnicalAnalysis(symbol) {
        const techContainer = document.querySelector('.tech-analysis-widget');
        techContainer.innerHTML = '';  // Clear any existing widget
        techContainer.style.height = 'auto';  // Reset height to prevent gaps

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js`;
        script.async = true;

        script.innerHTML = JSON.stringify({
            "interval": "1m",
            "width": "100%",
            "isTransparent": false,
            "height": 450,  // Ensure height is set properly
            "symbol": symbol,
            "showIntervalTabs": true,
            "displayMode": "single",
            "locale": "en",
            "colorTheme": "dark"
        });

        techContainer.appendChild(script);
    }

    // Function to clear existing widgets before adding new ones
    function clearExistingWidgets() {
        // Clear stock chart
        const widgetContainer = document.getElementById('tradingview-widget');
        if (widgetContainer) {
            widgetContainer.innerHTML = '';  // Remove the existing stock chart widget
            widgetContainer.style.height = 'auto';  // Reset height to prevent gaps
        }

        // Clear technical analysis widget
        const techContainer = document.querySelector('.tech-analysis-widget');
        if (techContainer) {
            techContainer.innerHTML = '';  // Remove the existing technical analysis widget
            techContainer.style.height = 'auto';  // Reset height to prevent gaps
        }
    }

    // Fancy fade-in effect for sections
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function (
        entries,
        appearOnScroll
    ) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        });
    },
        appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Animated sidebar open and close
    document.querySelector('.openbtn').addEventListener('click', () => {
        document.getElementById('mySidebar').style.width = '250px';
    });

    document.querySelector('.closebtn').addEventListener('click', () => {
        document.getElementById('mySidebar').style.width = '0';
    });

    // Sparkly circle trail effect (more subtle and modern)
    document.addEventListener('mousemove', function(e) {
        createSparkle(e.clientX, e.clientY);
    });

    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle-trail';
        sparkle.style.left = `${x}px`;
        sparkle.style.top = `${y}px`;

        document.body.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 1000); // Longer duration for a more subtle effect
    }
});
