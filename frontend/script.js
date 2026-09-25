const API_URL = "https://rsa-cryptography.onrender.com"; 
 
// =============================== 
// ELEMENTS 
// =============================== 
 
const encryptTab = document.getElementById("encryptTab"); 
const decryptTab = document.getElementById("decryptTab"); 
 
const encryptPanel = document.getElementById("encryptPanel"); 
const decryptPanel = document.getElementById("decryptPanel"); 
 
const messageInput = document.getElementById("messageInput"); 
const cipherInput = document.getElementById("cipherInput"); 
 
const encryptBtn = document.getElementById("encryptBtn"); 
const decryptBtn = document.getElementById("decryptBtn"); 
 
const encryptedOutput = document.getElementById("encryptedOutput"); 
const decryptedOutput = document.getElementById("decryptedOutput"); 
 
const charCount = document.getElementById("charCount"); 
 
const copyEncryptBtn = document.getElementById("copyEncryptBtn"); 
const copyDecryptBtn = document.getElementById("copyDecryptBtn"); 
 
const statusDot = document.getElementById("statusDot"); 
const statusText = document.getElementById("statusText"); 
 
const monitorInput = 
    document.getElementById("monitorInput"); 
 
const monitorKey = 
    document.getElementById("monitorKey"); 
 
const monitorOutput = 
    document.getElementById("monitorOutput"); 
 
const operationMessage = 
    document.getElementById("operationMessage"); 
 
// =============================== 
// BACKEND STATUS 
// =============================== 
 
async function checkBackend() { 
 
    try { 
 
        const response = await fetch(`${API_URL}/`); 
 
        if (!response.ok) { 
            throw new Error("Backend unavailable"); 
        } 
 
        const data = await response.json(); 
 
        statusDot.classList.add("online"); 
        statusText.textContent = "Backend Connected"; 
 
    } catch (error) { 
 
        statusDot.classList.remove("online"); 
        statusText.textContent = "Backend Offline"; 
 
        console.error("Backend error:", error); 
    } 
} 
 
 
// =============================== 
// LOAD RSA KEYS 
// =============================== 
 
async function loadKeys() { 
 
    try { 
 
        const response = await fetch(`${API_URL}/keys`); 
 
        if (!response.ok) { 
            throw new Error("Could not load keys"); 
        } 
 
        const data = await response.json(); 
 
        document.getElementById("keyP").textContent = data.p; 
        document.getElementById("keyQ").textContent = data.q; 
        document.getElementById("keyN").textContent = data.n; 
        document.getElementById("keyPhi").textContent = data.phi; 
 
        document.getElementById("keyE").textContent = 
            data.public_key.e; 
 
        document.getElementById("keyD").textContent = 
            data.private_key.d; 
 
        // Update RSA Mathematics Visualizer 
 
        document.getElementById("mathP").textContent = 
            data.p; 
 
        document.getElementById("mathQ").textContent = 
            data.q; 
 
        document.getElementById("mathN").textContent = 
            data.n; 
 
        document.getElementById("mathPhi").textContent = 
            data.phi; 
 
        document.getElementById("mathE").textContent = 
            data.public_key.e; 
 
        document.getElementById("mathD").textContent = 
            data.private_key.d; 
 
        document.getElementById("mathPublicKey").textContent = 
            `(${data.public_key.e}, ${data.public_key.n})`; 
 
        document.getElementById("mathPrivateKey").textContent = 
            `(${data.private_key.d}, ${data.private_key.n})`; 
 
        document.getElementById("publicKey").textContent = 
            `(${data.public_key.e}, ${data.public_key.n})`; 
 
        document.getElementById("privateKey").textContent = 
            `(${data.private_key.d}, ${data.private_key.n})`; 
 
    } catch (error) { 
 
        console.error("Key loading error:", error); 
 
    } 
} 
 
 
// =============================== 
// TAB SWITCHING 
// =============================== 
 
encryptTab.addEventListener("click", () => { 
 
    encryptTab.classList.add("active"); 
    decryptTab.classList.remove("active"); 
 
    encryptPanel.classList.remove("hidden"); 
    decryptPanel.classList.add("hidden"); 
 
}); 
 
 
decryptTab.addEventListener("click", () => { 
 
    decryptTab.classList.add("active"); 
    encryptTab.classList.remove("active"); 
 
    decryptPanel.classList.remove("hidden"); 
    encryptPanel.classList.add("hidden"); 
 
}); 
 
 
// =============================== 
// CHARACTER COUNTER 
// =============================== 
 
messageInput.addEventListener("input", () => { 
 
    const length = messageInput.value.length; 
 
    charCount.textContent = `${length} / 500`; 
 
}); 
 
 
// =============================== 
// ENCRYPT MESSAGE 
// =============================== 
 
encryptBtn.addEventListener("click", async () => { 
 
    const message = messageInput.value.trim(); 
 
    if (!message) { 
 
        encryptedOutput.textContent = 
            "Please enter a message first."; 
 
        return; 
    } 
 
    encryptBtn.disabled = true; 
    encryptBtn.innerHTML = "⏳ Encrypting..."; 
 
    // Operation Monitor Animation
    animateMonitor(); 
 
    try { 
 
        const response = await fetch(`${API_URL}/encrypt-text`, { 
 
            method: "POST", 
 
            headers: { 
                "Content-Type": "application/json" 
            }, 
 
            body: JSON.stringify({ 
                message: message 
            }) 
 
        }); 
 
        const data = await response.json(); 
 
        if (!response.ok || !data.success) { 
            throw new Error(data.error || data); 
        } 
 
        // Format encrypted numbers 
        const encryptedText = 
            `[${data.encrypted.join(", ")}]`; 
 
        encryptedOutput.textContent = encryptedText; 
 
        // Update operation monitor 
 
        monitorInput.textContent = message; 
 
        monitorKey.textContent = 
            `(${document.getElementById("keyE").textContent}, ${document.getElementById("keyN").textContent})`; 
 
        monitorOutput.textContent = 
            encryptedText; 
 
        operationMessage.textContent = 
            `RSA encryption completed successfully — ${data.encrypted.length} character values processed.`; 
 
        // Automatically place ciphertext 
        // inside decrypt box for easy demonstration 
        cipherInput.value = encryptedText; 
 
    } catch (error) { 
 
        encryptedOutput.textContent = 
            `Error: ${error.message}`; 
 
        console.error(error); 
 
    } finally { 
 
        encryptBtn.disabled = false; 
 
        encryptBtn.innerHTML = 
            "<span>🔐</span> Encrypt Message"; 
 
    } 
 
}); 
 
 
// =============================== 
// DECRYPT MESSAGE 
// =============================== 
 
decryptBtn.addEventListener("click", async () => { 
 
    const input = cipherInput.value.trim(); 
 
    if (!input) { 
 
        decryptedOutput.textContent = 
            "Please enter ciphertext first."; 
 
        return; 
    } 
 
    decryptBtn.disabled = true; 
    decryptBtn.innerHTML = "⏳ Decrypting..."; 
 
    // Operation Monitor Animation
    animateMonitor(); 
 
    try { 
 
        let cipher; 
 
        // Try JSON format first 
        // Example: 
        // [1087, 155, 83, 83, 913] 
 
        try { 
 
            cipher = JSON.parse(input); 
 
        } catch { 
 
            // If JSON parsing fails, 
            // extract all numbers from the text 
 
            cipher = input 
                .match(/\d+/g) 
                ?.map(Number); 
 
        } 
 
        if (!Array.isArray(cipher) || cipher.length === 0) { 
 
            throw new Error( 
                "Invalid ciphertext format." 
            ); 
 
        } 
 
        const response = await fetch(`${API_URL}/decrypt-text`, { 
 
            method: "POST", 
 
            headers: { 
                "Content-Type": "application/json" 
            }, 
 
            body: JSON.stringify({ 
                cipher: cipher 
            }) 
 
        }); 
 
        const data = await response.json(); 
 
        if (!response.ok || !data.success) { 
            throw new Error(data.error || data); 
        } 
 
        decryptedOutput.textContent = 
            data.decrypted; 
 
        // Update operation monitor 
 
        monitorInput.textContent = JSON.stringify(cipher); 
 
        monitorKey.textContent = 
            `(${document.getElementById("keyD").textContent}, ${document.getElementById("keyN").textContent})`; 
 
        monitorOutput.textContent = 
            data.decrypted; 
 
        operationMessage.textContent = 
            "RSA decryption completed successfully."; 
 
    } catch (error) { 
 
        decryptedOutput.textContent = 
            `Error: ${error.message}`; 
 
        console.error(error); 
 
    } finally { 
 
        decryptBtn.disabled = false; 
 
        decryptBtn.innerHTML = 
            "<span>🔓</span> Decrypt Message"; 
 
    } 
 
}); 
 
 
// =============================== 
// COPY ENCRYPTED OUTPUT 
// =============================== 
 
copyEncryptBtn.addEventListener("click", async () => { 
 
    const text = encryptedOutput.textContent; 
 
    if (!text || text.includes("will appear here")) { 
        return; 
    } 
 
    await navigator.clipboard.writeText(text); 
 
    copyEncryptBtn.textContent = "Copied!"; 
 
    setTimeout(() => { 
        copyEncryptBtn.textContent = "Copy"; 
    }, 1500); 
 
}); 
 
 
// =============================== 
// COPY DECRYPTED OUTPUT 
// =============================== 
 
copyDecryptBtn.addEventListener("click", async () => { 
 
    const text = decryptedOutput.textContent; 
 
    if (!text || text.includes("will appear here")) { 
        return; 
    } 
 
    await navigator.clipboard.writeText(text); 
 
    copyDecryptBtn.textContent = "Copied!"; 
 
    setTimeout(() => { 
        copyDecryptBtn.textContent = "Copy"; 
    }, 1500); 
 
}); 
 
 
// =============================== 
// INITIALIZE APP 
// =============================== 
 
async function initializeApp() { 
 
    await checkBackend(); 
 
    await loadKeys(); 
 
} 
 
 
 
// ========================================= 
// LIVE STATS 
// ========================================= 
 
const messageStat = document.getElementById("messageStat"); 
const cipherStat = document.getElementById("cipherStat"); 
const operationStat = document.getElementById("operationStat"); 
 
const flowInput = document.getElementById("flowInput"); 
const flowPublic = document.getElementById("flowPublic"); 
const flowCipher = document.getElementById("flowCipher"); 
const flowPrivate = document.getElementById("flowPrivate"); 
const flowOutput = document.getElementById("flowOutput"); 
 
 
function clearFlow() { 
 
    [ 
        flowInput, 
        flowPublic, 
        flowCipher, 
        flowPrivate, 
        flowOutput 
    ].forEach(node => { 
 
        if (node) { 
            node.classList.remove("active"); 
            node.classList.remove("success"); 
        } 
 
    }); 
 
} 
 
 
// ========================================= 
// MESSAGE STAT 
// ========================================= 
 
messageInput.addEventListener("input", () => { 
 
    if (messageStat) { 
        messageStat.textContent = 
            `${messageInput.value.length} chars`; 
    } 
 
}); 
 
 
// ========================================= 
// ENCRYPT FLOW 
// ========================================= 
 
encryptBtn.addEventListener("click", () => { 
 
    clearFlow(); 
 
    if (!messageInput.value.trim()) { 
        return; 
    } 
 
    flowInput.classList.add("active"); 
 
    setTimeout(() => { 
 
        flowInput.classList.remove("active"); 
        flowPublic.classList.add("active"); 
 
    }, 300); 
 
    setTimeout(() => { 
 
        flowPublic.classList.remove("active"); 
        flowCipher.classList.add("active"); 
 
    }, 650); 
 
    setTimeout(() => { 
 
        flowCipher.classList.remove("active"); 
        flowCipher.classList.add("success"); 
 
    }, 1000); 
 
    setTimeout(() => { 
 
        if (cipherStat) { 
 
            const match = 
                encryptedOutput.textContent.match(/\d+/g); 
 
            cipherStat.textContent = 
                match 
                    ? `${match.length} values` 
                    : "0 values"; 
        } 
 
        if (operationStat) { 
            operationStat.textContent = "Encrypted"; 
        } 
 
    }, 1100); 
 
}); 
 
 
// ========================================= 
// DECRYPT FLOW 
// ========================================= 
 
decryptBtn.addEventListener("click", () => { 
 
    clearFlow(); 
 
    if (!cipherInput.value.trim()) { 
        return; 
    } 
 
    flowCipher.classList.add("active"); 
 
    setTimeout(() => { 
 
        flowCipher.classList.remove("active"); 
        flowPrivate.classList.add("active"); 
 
    }, 350); 
 
    setTimeout(() => { 
 
        flowPrivate.classList.remove("active"); 
        flowOutput.classList.add("active"); 
 
    }, 700); 
 
    setTimeout(() => { 
 
        flowOutput.classList.remove("active"); 
        flowOutput.classList.add("success"); 
 
        if (operationStat) { 
            operationStat.textContent = "Decrypted"; 
        } 
 
    }, 1050); 
 
}); 
 
// ========================================= 
// OPERATION MONITOR ANIMATION 
// ========================================= 
 
const monitorStages = 
    document.querySelectorAll(".monitor-stage"); 
 
 
function animateMonitor() { 
 
    monitorStages.forEach(stage => { 
        stage.classList.remove("active"); 
    }); 
 
    monitorStages[0]?.classList.add("active"); 
 
    setTimeout(() => { 
 
        monitorStages[0]?.classList.remove("active"); 
        monitorStages[1]?.classList.add("active"); 
 
    }, 400); 
 
    setTimeout(() => { 
 
        monitorStages[1]?.classList.remove("active"); 
        monitorStages[2]?.classList.add("active"); 
 
    }, 800); 
 
    setTimeout(() => { 
 
        monitorStages[2]?.classList.remove("active"); 
 
    }, 1300); 
 
} 
 
 
// ========================================= 
// RSA MATH ANIMATION 
// ========================================= 
 
const mathSteps = [ 
    document.getElementById("mathStep1"), 
    document.getElementById("mathStep2"), 
    document.getElementById("mathStep3"), 
    document.getElementById("mathStep4"), 
    document.getElementById("mathStep5") 
]; 
 
 
function animateMathSteps() { 
 
    mathSteps.forEach(step => { 
 
        if (step) { 
            step.classList.remove("active"); 
        } 
 
    }); 
 
    mathSteps.forEach((step, index) => { 
 
        if (!step) return; 
 
        setTimeout(() => { 
 
            step.classList.add("active"); 
 
        }, index * 450); 
 
        setTimeout(() => { 
 
            step.classList.remove("active"); 
 
        }, index * 450 + 350); 
 
    }); 
 
} 
 
 
// Run when page loads 
setTimeout(animateMathSteps, 1000); 
 
 
// Start application 
initializeApp();