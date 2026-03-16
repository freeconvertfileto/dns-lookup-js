(function() {
    var inputEl = document.getElementById('dnsDomain');
    var typeEl = document.getElementById('dnsType');
    var btnEl = document.getElementById('dnsLookup');
    var resultsEl = document.getElementById('dnsResults');
    var loadingEl = document.getElementById('dnsLoading');
    var dataEl = document.getElementById('dnsData');

    function lookup() {
        var domain = inputEl.value.trim().replace(/^https?:\/\//, '').replace(/\/.*$/, '');
        if (!domain) return;
        var type = typeEl.value;
        resultsEl.style.display = 'block';
        loadingEl.style.display = 'block';
        dataEl.innerHTML = '';
        btnEl.disabled = true;

        fetch('https://api.file-converter-free.com/api/dns?domain=' + encodeURIComponent(domain) + '&type=' + encodeURIComponent(type))
            .then(function(r) { return r.json(); })
            .then(function(data) {
                loadingEl.style.display = 'none';
                btnEl.disabled = false;
                if (data.error) { dataEl.innerHTML = '<div class="nettool-error">' + data.error + '</div>'; return; }
                var html = '';
                var recs = data.records || data.results;
                if (recs && typeof recs === 'object' && !Array.isArray(recs)) {
                    var rkeys = Object.keys(recs);
                    for (var ri = 0; ri < rkeys.length; ri++) {
                        var vals = recs[rkeys[ri]];
                        if (!vals || (Array.isArray(vals) && vals.length === 0)) continue;
                        html += '<div class="nettool-section-title">' + rkeys[ri] + '</div>';
                        if (Array.isArray(vals)) {
                            for (var vi = 0; vi < vals.length; vi++) {
                                if (typeof vals[vi] === 'object' && vals[vi] !== null) {
                                    var okeys = Object.keys(vals[vi]);
                                    for (var oi = 0; oi < okeys.length; oi++) {
                                        html += '<div class="nettool-row"><span class="nettool-key">' + okeys[oi] + '</span><span class="nettool-val">' + vals[vi][okeys[oi]] + '</span></div>';
                                    }
                                } else {
                                    html += '<div class="nettool-row"><span class="nettool-val">' + vals[vi] + '</span></div>';
                                }
                            }
                        } else {
                            html += '<div class="nettool-row"><span class="nettool-val">' + vals + '</span></div>';
                        }
                    }
                }
                dataEl.innerHTML = html || '<div class="nettool-error">No DNS records found.</div>';
            })
            .catch(function() {
                loadingEl.style.display = 'none';
                btnEl.disabled = false;
                dataEl.innerHTML = '<div class="nettool-error">Failed to fetch DNS records. Please try again.</div>';
            });
    }

    btnEl.addEventListener('click', lookup);
    inputEl.addEventListener('keydown', function(e) { if (e.key === 'Enter') lookup(); });
})();
