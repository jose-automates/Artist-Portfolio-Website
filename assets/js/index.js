// My own JS script for index.html
$(document).ready(function() {
    showInfoAlert("<h3 style='color:#18d26e;'>Info</h3>", "<h6>This is a ficticious portfolio created to showcase web development skills</h6>");
    grabContentForDetailsPage(); // Portfolio Details Related Code
    sendContactInfoToServer(); // Contact Form Related Code
});

/* Custom jAlert Handlers */
function showInfoAlert(titleHTML, messageHTML)
{
    // Show info alert accoding to sessionStorage showInfo value
    const showInfo = !window.location.href.includes("#") || !window.location.href.includes("portfolio");

    // User is in raw index.html page and has not visited any section
    if (showInfo)
    {
        $.jAlert({
            "title": titleHTML,
            "content": messageHTML,
            "theme": "black",
        });
    }
}

function showErrorAlert(errorMessage)
{
    // Show an error jAlert when something went wrong
    errorAlert(errorMessage);
}

function showSuccessAlert(successMessage)
{
    // Show a success jAlert when something went right
    successAlert(successMessage);
}

function showPortfolioDetails()
{
    // Show portfolio details section
    const portfolioDetails = $("aside#pd");
    const portfolioShowCase = $("main#main");

    portfolioDetails.show();
    portfolioShowCase.hide();

    // Display results from sessionStorage
    displayStoredResults();
}

function hidePortfolioDetails()
{
    // Hide portfolio details section
    const portfolioDetails = $("aside#pd");
    const portfolioShowCase = $("main#main");

    portfolioDetails.hide();
    portfolioShowCase.show();
}

/* Portfolio Details Code */

// This is a static, front-end-only demo: there is no back end to fetch
// project details from, so each project's details live here instead.
const portfolioProjects = {
    1: {
        title: "Moonlit Orchard",
        category: "Book Cover Design",
        company: "Hazel Ridge Press",
        date: "March 2024",
        description: "A hand-painted cover for an indie YA fantasy novel about a girl who inherits her grandmother's orchard — and the magic buried beneath it. I built the composition around a single silvery apple tree lit by moonlight, using a limited palette of indigo and gold to keep the mood dreamy without losing readability at thumbnail size. The lettering was hand-drawn and scanned in, then vectorized in Illustrator so it would hold up across print and e-book formats."
    },
    2: {
        title: "Golden Hour at Discovery Park",
        category: "Landscape Photography",
        company: "Personal Project",
        date: "June 2023",
        description: "Shot over three evenings at Discovery Park while I was chasing the perfect light for a series on California's changing seasons. I wanted the photo to feel like a held breath — the last warm minute before dusk — so I underexposed slightly in-camera and pulled the shadows back in post to keep the golden tones from blowing out. It's one of my most-requested prints at school art shows."
    },
    3: {
        title: "The Clockmaker's Daughter",
        category: "Book Cover Design",
        company: "Hazel Ridge Press",
        date: "September 2023",
        description: "A vintage-inspired cover for a mystery novel set in a fictional 1920s watchmaking town. I researched real clockmaking diagrams to get the gear illustrations technically believable, then aged the palette with sepia tones and a subtle paper-grain texture. The author told me it was the first cover concept she approved without a single revision."
    },
    4: {
        title: "Roots & Resilience",
        category: "Editorial Illustration",
        company: "Sacramento Environmental Coalition",
        date: "April 2024",
        description: "Commissioned for the Coalition's Earth Day campaign, this piece imagines a neighborhood's root systems as one interconnected network beneath the sidewalk cracks — a visual metaphor for community climate resilience. I'd volunteered with the Coalition's cleanup crews for a year before this project, and wanted the illustration to reflect what I actually saw: quiet, collective effort, not grand gestures."
    },
    5: {
        title: "Downtown Farmers Market",
        category: "Event Photography",
        company: "Sacramento Downtown Partnership",
        date: "August 2023",
        description: "A candid documentary series covering a Saturday at the downtown farmers market, shot on assignment for the Partnership's social media relaunch. I focused on hands — a vendor weighing peaches, a kid reaching for a strawberry sample — to keep the story human-scale rather than just wide shots of stalls. Six images from this set later ran in the Partnership's fall newsletter."
    },
    6: {
        title: "Beneath a Paper Sky",
        category: "Book Cover Design",
        company: "Independent Author (self-published)",
        date: "November 2023",
        description: "A minimalist cover for a self-published poetry chapbook exploring grief and memory. The author asked for 'something that feels like folding a letter you'll never send,' so I built the image around a single origami crane dissolving into clouds shaped like more paper cranes. It's one of the pieces I'm proudest of, because the brief was almost entirely a feeling, not a description."
    },
    7: {
        title: "The Last Monarch",
        category: "Editorial Illustration",
        company: "Artistry Magazine",
        date: "February 2024",
        description: "An illustration accompanying a feature story on the decline of monarch butterfly populations along the Pacific Flyway. I layered dozens of hand-drawn wing patterns so a single monarch dissolves into a swarm of moths at the edge of the frame — a quiet visual argument about what's being lost. This ran alongside my internship byline in Artistry's spring issue."
    },
    8: {
        title: "Portraits of Kindness",
        category: "Illustration Series",
        company: "Art4Change",
        date: "July 2022",
        description: "A five-piece illustration series created during my volunteer work with Art4Change, each portrait paired with a short story from someone the nonprofit had directly helped. I worked from real interview notes (names changed for privacy) to keep the likenesses respectful rather than generic. The series was displayed at the nonprofit's annual fundraiser gala."
    },
    9: {
        title: "Riverbank Cleanup Day",
        category: "Documentary Photography",
        company: "Sacramento River Conservancy",
        date: "May 2024",
        description: "Photographed a volunteer cleanup along the American River for the Conservancy's annual report. I shot mostly wide and low to show the scale of the debris removed, then closed the essay with one quiet frame of a volunteer's muddy gloves resting on a full trash bag. It's become one of my favorite examples of photography advocating for something without needing a caption."
    }
};

function grabContentForDetailsPage()
{
    // Grab all div elements with a class "portfolio-links"
    const portfolioDetailsLinksContainers = $("div.portfolio-links");

    // Loop through each div that contains portfolio-links
    portfolioDetailsLinksContainers.each(function(i) {

        // Grab the current number for this container
        const currentContainerNum = i + 1;

        // Grab the current div
        const currentPortfolioDetailsLinkContainer = $(this);

        // Grab both <a> link tags which are the children of this div
        const currentPortfolioDetailsLinks = currentPortfolioDetailsLinkContainer.find("a");

        // Grab the first and second link separately
        const currentPortfolioDetailsLink = currentPortfolioDetailsLinks.eq(1);

        // Add a click event to the second link
        currentPortfolioDetailsLink.on("click", function(e) {
            // Do not redirect to portfolio-details.html (It does not exist anymore)
            e.preventDefault();

            // This is a static front-end demo, so project details are read
            // straight from the portfolioProjects map above instead of a
            // back-end request.
            const projectData = portfolioProjects[currentContainerNum];

            if (!projectData)
            {
                showErrorAlert("<div><p>Couldn't get information about this portfolio project.</p><p>Try again later</p></div>");
                return;
            }

            const jsonResponse = Object.assign({}, projectData);
            jsonResponse['image_url'] = "assets/img/portfolio/portfolio-" + currentContainerNum + ".jpg";

            sessionStorage.setItem("portfolioDetails", JSON.stringify(jsonResponse));

            showPortfolioDetails();
        });

    });
}

function displayStoredResults()
{
    // Display the results shown in session storage
    // Grab content from session storage
    const sessionStorageContent = sessionStorage.getItem("portfolioDetails");

    // Convert it into anobject
    const sessionStorageObject = JSON.parse(sessionStorageContent);

    // Grab required DOM elements
    const portfolioTitleElement = $("#portfolio-title");
    const portfolioImageElement = $("#portfolio-image");
    const portfolioCategoryElement = $("#portfolio-category");
    const portfolioCompanyElement = $("#portfolio-company");
    const portfolioDateElement = $("#portfolio-date");
    const portfolioDescriptionElement = $("#portfolio-description");

    // Set the text of each DOM element to its required property
    portfolioTitleElement.text(sessionStorageObject.title);
    portfolioImageElement.attr("src", sessionStorageObject.image_url);
    portfolioCategoryElement.text(sessionStorageObject.category);
    portfolioCompanyElement.text(sessionStorageObject.company);
    portfolioDateElement.text(sessionStorageObject.date);
    portfolioDescriptionElement.text(sessionStorageObject.description);

    // Allow user to go back to default page
    goBackToPortfolio();
}

function goBackToPortfolio()
{
    // Go back to the portfolio page when the user clicks the "x" button
    const goBackLink = $("#go-back-link");

    // Add an click event listener to this link with the on method
    goBackLink.on("click", function(e) {
        e.preventDefault();
        clearSessionStorage();
        hidePortfolioDetails();
    });
}

function clearSessionStorage()
{
    //Be sure to clear session Storage when it's no longer required
    sessionStorage.removeItem("portfolioDetails");
}

/* Contact Form Code */

function addClassIfAbsent(element, classToAdd)
{
    /* Add a class to a DOM element if it doesn't have it */
    if (!element.hasClass(classToAdd))
    {
        element.addClass(classToAdd);
    }
}

function removeClassIfPresent(element, classToRemove)
{
    /* Remove a class from an element if it has it */
    if (element.hasClass(classToRemove))
    {
        element.removeClass(classToRemove);
    }
}

function isInvalidField(conditionForInvalid, element)
{
    /* Show an element as invalid or not according to a given condition */
    if (conditionForInvalid)
    {
        addClassIfAbsent(element, "is-invalid");
        return true;
    }

    else
    {
        removeClassIfPresent(element, "is-invalid");
        return false;
    }
}

function sendContactInfoToServer()
{
    /* Send the contact info to the server */

    // Grab the contact form
    const contactForm = $("form#contact-form");
    const contactFormBtn = $("button#contact-form-btn");
    // Listen for the submit event
    contactForm.on("submit", function(e) {
        // Prevent default event
        e.preventDefault();

        // Grab elements that hold required data
        const nameElement = $("input#name");
        const emailElement = $("input#email");
        const subjectElement = $("input#subject");
        const messageElement = $("textarea[name='message']");

        // Grab required data from elements
        const name = nameElement.val();
        const email = emailElement.val();
        const subject = subjectElement.val();
        const message = messageElement.val();

        // Regex for Form Validation
        const nameRegex = /^[A-Za-z\s]+$/;
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

        // Check for any invalid element
        const isNameInvalid = isInvalidField(!nameRegex.test(name), nameElement);
        const isEmailInvalid = isInvalidField(!emailRegex.test(email), emailElement);
        const isSubjectInvalid = isInvalidField(subject.length === 0, subjectElement);
        const isMessageInvalid = isInvalidField(message.length === 0, messageElement);

        const isSomeValueInvalid = [isNameInvalid, isEmailInvalid, isSubjectInvalid, isMessageInvalid];

        function isSomeInvalid(element)
        {
            return element == true;
        }

        if (isSomeValueInvalid.some(isSomeInvalid))
        {
            return; // Return early to not send AJAX request
        }

        // ONLY SEND AJAX REQUEST WHEN THE BUTTON DOES NOT HAVE A SPINNER

        // Provide an AJAX request in order to submit this to the back-end
        if (!contactFormBtn.is(":has(span.spinner-border)"))
        {
            $.ajax({
                url: contactBackEndProcessorLink,
                type: "POST",
                data: JSON.stringify({
                    "name" : name,
                    "email" : email,
                    "subject": subject,
                    "message": message
                }),
                beforeSend: function() {
                    contactFormBtn.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>');
                },
                success: function(response)
                {
                    if (response.hasOwnProperty("success"))
                    {
                        showSuccessAlert(response["success"]);
                    }
    
                    else if (response.hasOwnProperty("error"))
                    {
                        showErrorAlert(response["error"]);
                    }
    
                    else
                    {
                        showErrorAlert("Communication with the web server failed.");
                    }
                },
                error: function(xhr, status, error)
                {
                    showErrorAlert("<div><p>Couldn't send your message.</p><p>Try again later</p></div>");
                },
                complete: function()
                {
                    contactFormBtn.html('Send Message');
                }
            });
        }
    });

}