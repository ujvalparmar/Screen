// Redesigned JS for Interactive Stock Screener

document.addEventListener("DOMContentLoaded", () => {
    const searchBar = document.querySelector("#search-bar");
    const searchButton = document.querySelector("#search-button");
    const graphContainer = document.querySelector("#graph-container");

    const stockTableBody = document.querySelector("#stock-table-body");
    const stockTable = document.querySelector("#stock-table");

    const apiKey = "Q1kaQmkji6MrRa62BNNNMredTgCFagj3";
    const apiUrl = "https://example-stock-api.com/data?symbol=";

    // Event listener for search
    searchButton.addEventListener("click", () => {
        const query = searchBar.value.trim();
        if (query) {
            fetchStockData(query);
        } else {
            alert("Please enter a valid stock symbol.");
        }
    });

    async function fetchStockData(stockSymbol) {
        try {
            const response = await fetch(`${apiUrl}${stockSymbol}&apikey=${apiKey}`);
            if (!response.ok) throw new Error("Error fetching stock data.");

            const data = await response.json();
            renderStockGraph(data);
            renderStockTable(data);
        } catch (error) {
            console.error(error);
            alert("Unable to fetch stock data. Please try again later.");
        }
    }

    function renderStockGraph(data) {
        // Clear existing graph
        graphContainer.innerHTML = '<canvas id="stock-graph"></canvas>';
        const ctx = document.querySelector("#stock-graph").getContext("2d");

        // Extract data for the graph
        const labels = data.history.map((entry) => entry.date);
        const prices = data.history.map((entry) => entry.close);

        new Chart(ctx, {
            type: "line",
            data: {
                labels,
                datasets: [
                    {
                        label: `${data.symbol} Stock Prices`,
                        data: prices,
                        borderColor: "#2563eb",
                        backgroundColor: "rgba(37, 99, 235, 0.1)",
                        tension: 0.3,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: "top",
                    },
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: "Date",
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: "Price (USD)",
                        },
                    },
                },
            },
        });
    }

    function renderStockTable(data) {
        // Clear existing table data
        stockTableBody.innerHTML = "";

        // Populate table with stock data
        data.history.forEach((entry) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${entry.date}</td>
                <td>${entry.open}</td>
                <td>${entry.high}</td>
                <td>${entry.low}</td>
                <td>${entry.close}</td>
                <td>${entry.volume}</td>
            `;
            stockTableBody.appendChild(row);
        });

        // Show table
        stockTable.style.display = "table";
    }
});

