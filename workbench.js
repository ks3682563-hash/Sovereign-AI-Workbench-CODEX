// ========================================
// PAGE TITLES
// ========================================

const pageData = {

    dashboard: {
        title: "Dashboard",
        subtitle: "Overview of your Sovereign AI environment"
    },

    agent: {
        title: "AI Agent",
        subtitle: "Interact with your private intelligent assistant"
    },

    documents: {
        title: "Document Intelligence",
        subtitle: "Manage confidential knowledge securely"
    },

    vision: {
        title: "Vision AI",
        subtitle: "Secure multimodal visual intelligence"
    },

    analytics: {
        title: "Analytics",
        subtitle: "Monitor AI operations and system insights"
    },

    reports: {
        title: "Reports",
        subtitle: "Generate intelligent industrial reports"
    }

};


// ========================================
// SHOW SECTION
// ========================================

function showSection(sectionId, button) {

    const sections =
        document.querySelectorAll(".content-section");

    sections.forEach(function (section) {
        section.classList.remove("active-section");
    });


    document
        .getElementById(sectionId)
        .classList.add("active-section");


    const menuItems =
        document.querySelectorAll(".menu-item");

    menuItems.forEach(function (item) {
        item.classList.remove("active");
    });


    button.classList.add("active");


    document.getElementById("pageTitle").textContent =
        pageData[sectionId].title;

    document.getElementById("pageSubtitle").textContent =
        pageData[sectionId].subtitle;

}


// ========================================
// AI AGENT CHAT
// FRONTEND DEMO
// ========================================

function sendMessage() {

    const input =
        document.getElementById("userInput");

    const message =
        input.value.trim();


    if (message === "") {
        return;
    }


    const chatMessages =
        document.getElementById("chatMessages");


    const userMessage =
        document.createElement("div");

    userMessage.className =
        "message user-message";


    userMessage.innerHTML = `

        <div class="message-content">

            <p>${message}</p>

            <span class="message-time">
                Just now
            </span>

        </div>

    `;


    chatMessages.appendChild(userMessage);


    input.value = "";


    chatMessages.scrollTop =
        chatMessages.scrollHeight;


    // Demo AI response

    setTimeout(function () {

        const aiMessage =
            document.createElement("div");

        aiMessage.className =
            "message ai-message";


        aiMessage.innerHTML = `

            <div class="message-avatar">
                AI
            </div>

            <div class="message-content">

                <p>
                    Request received. The Sovereign AI Agent is ready
                    to process your query securely within the controlled
                    environment.
                </p>

                <span class="message-time">
                    🔒 Local Processing
                </span>

            </div>

        `;


        chatMessages.appendChild(aiMessage);


        chatMessages.scrollTop =
            chatMessages.scrollHeight;


    }, 700);

}


// ========================================
// ENTER KEY
// ========================================

function handleEnter(event) {

    if (event.key === "Enter") {
        sendMessage();
    }

}


// ========================================
// SUGGESTED PROMPTS
// ========================================

function usePrompt(prompt) {

    const input =
        document.getElementById("userInput");

    input.value = prompt;

    sendMessage();

}


// ========================================
// CLEAR CHAT
// ========================================

function clearChat() {

    const chatMessages =
        document.getElementById("chatMessages");


    chatMessages.innerHTML = `

        <div class="message ai-message">

            <div class="message-avatar">
                AI
            </div>

            <div class="message-content">

                <p>
                    Conversation cleared. How can I assist you?
                </p>

                <span class="message-time">
                    New Secure Session
                </span>

            </div>

        </div>

    `;

}


// ========================================
// DOCUMENT FILE UPLOAD
// FRONTEND DEMO
// ========================================

const fileInput =
    document.getElementById("fileInput");

const uploadBox =
    document.getElementById("uploadBox");


// File selection

fileInput.addEventListener(
    "change",
    function () {

        handleFiles(this.files);

    }
);


// Drag over

uploadBox.addEventListener(
    "dragover",
    function (event) {

        event.preventDefault();

        uploadBox.classList.add("dragover");

    }
);


// Drag leave

uploadBox.addEventListener(
    "dragleave",
    function () {

        uploadBox.classList.remove("dragover");

    }
);


// File drop

uploadBox.addEventListener(
    "drop",
    function (event) {

        event.preventDefault();

        uploadBox.classList.remove("dragover");

        handleFiles(event.dataTransfer.files);

    }
);


// ========================================
// HANDLE FILES
// ========================================

function handleFiles(files) {

    const documentList =
        document.getElementById("documentList");


    for (let i = 0; i < files.length; i++) {

        const file = files[i];

        const size =
            (file.size / 1024 / 1024).toFixed(2);


        let type = "FILE";
        let className = "pdf";


        if (
            file.name.endsWith(".xlsx") ||
            file.name.endsWith(".xls")
        ) {

            type = "XLS";
            className = "excel";

        }

        else if (
            file.name.endsWith(".txt")
        ) {

            type = "TXT";

        }

        else if (
            file.name.endsWith(".doc") ||
            file.name.endsWith(".docx")
        ) {

            type = "DOC";

        }


        const newDocument =
            document.createElement("div");

        newDocument.className =
            "document-item";


        newDocument.innerHTML = `

            <div class="document-left">

                <div class="file-icon ${className}">
                    ${type}
                </div>

                <div>

                    <h4>
                        ${file.name}
                    </h4>

                    <p>
                        ${size} MB • Ready for Processing
                    </p>

                </div>

            </div>


            <div class="document-right">

                <span class="ready">
                    ✓ Uploaded
                </span>

                <button class="more-btn">
                    ⋮
                </button>

            </div>

        `;


        documentList.prepend(newDocument);

    }


    fileInput.value = "";

}


console.log(
    "Sovereign AI Workbench Loaded Successfully"
);