/* =========================
   PAGE NAVIGATION
========================= */

function showPage(pageName) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(page => {
        page.classList.remove("active-page");
    });


    const selectedPage = document.getElementById(pageName);

    if (selectedPage) {
        selectedPage.classList.add("active-page");
    }


    const navItems = document.querySelectorAll(".nav-item");

    navItems.forEach(item => {

        item.classList.remove("active-nav");

        if (
            item.getAttribute("onclick") ===
            `showPage('${pageName}')`
        ) {
            item.classList.add("active-nav");
        }

    });

}


/* =========================
   TOAST
========================= */

function showToast(message) {

    let toast = document.getElementById("toast");

    if (!toast) {

        toast = document.createElement("div");
        toast.id = "toast";

        document.body.appendChild(toast);
    }

    toast.innerText = message;

    toast.classList.add("show-toast");


    setTimeout(() => {

        toast.classList.remove("show-toast");

    }, 2500);

}


/* =========================
   AI CHAT
========================= */

function sendMessage() {

    const input =
        document.getElementById("user-input");

    const message =
        input.value.trim();


    if (message === "") {

        showToast("Please enter a question");

        return;

    }


    const chatBox =
        document.getElementById("chat-box");


    const userMessage =
        document.createElement("div");


    userMessage.className =
        "message user-message";


    userMessage.innerHTML = `
        <strong>You</strong>
        <p>${message}</p>
    `;


    chatBox.appendChild(userMessage);


    input.value = "";


    const thinkingMessage =
        document.createElement("div");


    thinkingMessage.className =
        "message ai-message";


    thinkingMessage.innerHTML = `
        <strong>AI Assistant</strong>
        <p>⚡ Analyzing confidential industrial knowledge base...</p>
    `;


    chatBox.appendChild(thinkingMessage);


    chatBox.scrollTop =
        chatBox.scrollHeight;


    setTimeout(() => {

        thinkingMessage.innerHTML = `
            <strong>AI Assistant</strong>

            <p>
                Analysis complete.
            </p>

            <p>
                <strong>Probable Cause:</strong>
                Bearing degradation detected in Machine-17.
            </p>

            <p>
                <strong>Confidence:</strong>
                89%
            </p>

            <p>
                <strong>Recommended Action:</strong>
                Schedule predictive maintenance and inspect
                the bearing assembly.
            </p>

            <p>
                🔒 Analysis performed inside the sovereign
                on-premise AI environment.
            </p>
        `;


        chatBox.scrollTop =
            chatBox.scrollHeight;


        showToast("AI analysis completed");

    }, 1500);

}


/* ENTER KEY */

document.addEventListener("DOMContentLoaded", () => {

    const input =
        document.getElementById("user-input");


    input.addEventListener("keypress", function(event) {

        if (event.key === "Enter") {
            sendMessage();
        }

    });

});


/* =========================
   DOCUMENT UPLOAD
========================= */

function uploadDocument() {

    const fileInput =
        document.getElementById("document-file");


    const status =
        document.getElementById("document-status");


    if (fileInput.files.length > 0) {

        const file =
            fileInput.files[0];


        status.innerHTML =
            `⚡ Processing "${file.name}" securely...`;


        setTimeout(() => {

            status.innerHTML =
                `✓ ${file.name} successfully indexed into private knowledge base`;

            status.style.color =
                "#2de38a";


            showToast(
                "Document securely processed"
            );

        }, 1500);

    }

}


/* =========================
   IMAGE PREVIEW
========================= */

function previewImage() {

    const input =
        document.getElementById("image-upload");


    const preview =
        document.getElementById("image-preview");


    const placeholder =
        document.querySelector(".vision-placeholder");


    if (input.files && input.files[0]) {

        const reader =
            new FileReader();


        reader.onload = function(event) {

            preview.src =
                event.target.result;


            preview.style.display =
                "block";


            if (placeholder) {

                placeholder.style.display =
                    "none";

            }

        };


        reader.readAsDataURL(
            input.files[0]
        );


        showToast(
            "Inspection image ready"
        );

    }

}


/* =========================
   VISION AI
========================= */

function analyzeImage() {

    const input =
        document.getElementById("image-upload");


    const result =
        document.getElementById("vision-result");


    if (input.files.length === 0) {

        showToast(
            "Please upload an image first"
        );

        return;

    }


    result.style.display =
        "block";


    result.innerHTML =
        "⚡ Sovereign Vision AI is analyzing the inspection image...";


    setTimeout(() => {

        result.innerHTML = `

            <h3>✦ Vision Analysis Complete</h3>

            <br>

            <p>
                <strong>Detected:</strong>
                Industrial equipment components
            </p>

            <br>

            <p>
                <strong>Potential Issue:</strong>
                Surface degradation patterns detected.
                Physical inspection recommended.
            </p>

            <br>

            <p>
                <strong>Confidence:</strong>
                91%
            </p>

            <br>

            <p>
                🔒 Analysis completed locally.
                No confidential image data left the infrastructure.
            </p>

        `;


        showToast(
            "Vision AI analysis completed"
        );

    }, 2000);

}


/* =========================
   VIEW REPORT
========================= */

function viewReport(type) {

    const modal =
        document.getElementById("report-modal");


    const title =
        document.getElementById("modal-title");


    const body =
        document.getElementById("modal-body");


    if (type === "machine") {

        title.innerText =
            "Machine-17 Failure Analysis";


        body.innerHTML = `

            <h3>Executive Summary</h3>

            <p>
                AI analysis indicates a probable mechanical
                degradation issue affecting Machine-17.
            </p>

            <br>

            <h3>Probable Cause</h3>

            <p>
                Bearing degradation identified through maintenance
                history and sensor pattern comparison.
            </p>

            <br>

            <h3>Confidence Level</h3>

            <p>89%</p>

            <br>

            <h3>Recommended Action</h3>

            <p>
                Perform physical inspection and schedule predictive
                maintenance before further operational stress.
            </p>

            <br>

            <h3>Security</h3>

            <p>
                This analysis was generated inside the sovereign
                on-premise AI environment.
            </p>

        `;

    }

    else {

        title.innerText =
            "Weekly System Health Report";


        body.innerHTML = `

            <h3>Overall System Health</h3>

            <p>96% Healthy</p>

            <br>

            <h3>AI Agents</h3>

            <p>
                4 autonomous agents currently active.
            </p>

            <br>

            <h3>Knowledge Base</h3>

            <p>
                328 confidential documents indexed.
            </p>

            <br>

            <h3>Security Status</h3>

            <p>
                Protected. No external data transfer detected.
            </p>

            <br>

            <h3>Recommendation</h3>

            <p>
                Continue monitoring alerts requiring
                expert human approval.
            </p>

        `;

    }


    modal.style.display =
        "flex";

}


/* =========================
   CLOSE MODAL
========================= */

function closeModal() {

    document.getElementById(
        "report-modal"
    ).style.display = "none";

}


window.onclick = function(event) {

    const modal =
        document.getElementById(
            "report-modal"
        );


    if (event.target === modal) {

        modal.style.display =
            "none";

    }

};


/* =========================
   DOWNLOAD REPORT
========================= */

function downloadReport(type) {

    let content = "";
    let fileName = "";


    if (type === "machine") {

        fileName =
            "Machine-17-Failure-Analysis.txt";


        content = `
SOVEREIGN AI WORKBENCH

MACHINE-17 FAILURE ANALYSIS

Machine ID: M-17

Probable Cause:
Bearing degradation

Confidence:
89%

Recommended Action:
Perform predictive maintenance and inspect
bearing assembly.

Security:
Generated inside sovereign on-premise
AI infrastructure.
`;

    }

    else {

        fileName =
            "Weekly-System-Health-Report.txt";


        content = `
SOVEREIGN AI WORKBENCH

WEEKLY SYSTEM HEALTH REPORT

System Health:
96%

Active AI Agents:
4

Knowledge Base:
328 documents

Security:
Protected

Recommendation:
Continue monitoring industrial alerts
requiring human approval.
`;

    }


    const blob =
        new Blob(
            [content],
            {
                type: "text/plain"
            }
        );


    const link =
        document.createElement("a");


    link.href =
        URL.createObjectURL(blob);


    link.download =
        fileName;


    document.body.appendChild(link);


    link.click();


    document.body.removeChild(link);


    showToast(
        "Report downloaded successfully"
    );

}