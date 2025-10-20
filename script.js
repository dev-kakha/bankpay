fetch('/api/transactions')
    .then(response => response.json())
    .then(data => {
        const table = document.getElementById('transaction-table');
        data.forEach(tx => {
            const row = table.insertRow();
            row.insertCell(0).innerText = tx.date;
            row.insertCell(1).innerText = tx.type;
            row.insertCell(2).innerText = tx.amount;
        });
    });
