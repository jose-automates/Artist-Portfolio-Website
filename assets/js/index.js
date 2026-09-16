// My own JS script for index.html
$(document).ready(function() {
    grabContentForDetailsPage(); // Portfolio Details Related Code
    sendContactInfoToServer(); // Contact Form Related Code
});

/* Custom jAlert Handlers */
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
        description: "A hand-painted cover for an indie YA fantasy about a girl who inherits her grandmother's orchard, and the magic buried under it. I kept it simple: one silvery apple tree in the moonlight, indigo and gold so it still reads well as a tiny thumbnail. I hand-lettered the title myself and cleaned it up in Illustrator."
    },
    2: {
        title: "Golden Hour at Discovery Park",
        category: "Landscape Photography",
        company: "Personal Project",
        date: "June 2023",
        description: "I went back to Discovery Park three evenings in a row just to catch this light. Underexposed a touch in-camera so the golden tones wouldn't blow out, then pulled the shadows back in editing. Still my most-requested print at school art shows."
    },
    3: {
        title: "The Clockmaker's Daughter",
        category: "Book Cover Design",
        company: "Hazel Ridge Press",
        date: "September 2023",
        description: "A vintage cover for a mystery set in a 1920s watchmaking town. I looked up real clockmaking diagrams so the gears would hold up to a close look, then aged everything with sepia tones and a bit of paper grain. The author approved it on the first try, no revisions."
    },
    4: {
        title: "Roots & Resilience",
        category: "Editorial Illustration",
        company: "Sacramento Environmental Coalition",
        date: "April 2024",
        description: "Made for the Coalition's Earth Day campaign: roots under the sidewalk cracks, all connected, standing in for how a community holds itself together. I'd spent a year volunteering with their cleanup crews before this, so I wanted it to look like what I'd actually seen: quiet, steady effort, not a big dramatic gesture."
    },
    5: {
        title: "Downtown Farmers Market",
        category: "Event Photography",
        company: "Sacramento Downtown Partnership",
        date: "August 2023",
        description: "Shot on assignment for the Partnership's social media relaunch, one Saturday at the downtown market. I kept coming back to hands: a vendor weighing peaches, a kid grabbing a strawberry sample. Felt more honest than wide shots of the stalls. Six of these ended up in their fall newsletter."
    },
    6: {
        title: "Beneath a Paper Sky",
        category: "Book Cover Design",
        company: "Independent Author (self-published)",
        date: "November 2023",
        description: "A quiet cover for a self-published poetry chapbook about grief and memory. The author's brief was basically 'something that feels like folding a letter you'll never send,' so I drew one origami crane dissolving into a cloud of more cranes. Probably the piece I'm proudest of, since I had a feeling to work from, not a description."
    },
    7: {
        title: "The Last Monarch",
        category: "Editorial Illustration",
        company: "Artistry Magazine",
        date: "February 2024",
        description: "Drawn for a feature on the shrinking monarch population along the Pacific Flyway. I layered dozens of hand-drawn wings so one monarch slowly breaks apart into moths near the edge of the page, a small nod to what's disappearing. It ran with my byline in Artistry's spring issue, my first published illustration."
    },
    8: {
        title: "Portraits of Kindness",
        category: "Illustration Series",
        company: "Art4Change",
        date: "July 2022",
        description: "Five portraits I drew while volunteering with Art4Change, each paired with a short story from someone the nonprofit had actually helped. I worked from real interview notes, with names changed for privacy, so they'd feel specific instead of generic. The set hung at their annual fundraiser gala."
    },
    9: {
        title: "Riverbank Cleanup Day",
        category: "Documentary Photography",
        company: "Sacramento River Conservancy",
        date: "May 2024",
        description: "Photos from a volunteer cleanup along the American River, shot for the Conservancy's annual report. Mostly wide, low angles to show how much debris actually came out of there, ending on one still frame of muddy gloves resting on a full trash bag. No caption needed for that one."
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

// Live validation rules for each contact field. Each field is only
// considered "touched" (eligible to show a red/green state) once the
// visitor has typed into it or left it, so a pristine form doesn't
// open already showing errors.
const contactFormFields = {
    name: {
        selector: "input#name",
        validate: function(value) {
            return /^[A-Za-z\s]+$/.test(value.trim()) && value.trim().length > 0;
        }
    },
    email: {
        selector: "input#email",
        validate: function(value) {
            return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value.trim());
        }
    },
    subject: {
        selector: "input#subject",
        validate: function(value) {
            return value.trim().length > 0;
        }
    },
    message: {
        selector: "textarea[name='message']",
        validate: function(value) {
            return value.trim().length > 0;
        }
    }
};

function updateFieldValidationUI(fieldKey)
{
    /* Reflect one field's current validity: green check when valid,
       red border + its .invalid-feedback message when invalid and
       touched, or a neutral untouched state otherwise. */
    const field = contactFormFields[fieldKey];
    const fieldElement = $(field.selector);
    const iconElement = fieldElement.next(".field-valid-icon");
    const isValid = field.validate(fieldElement.val());
    const isTouched = fieldElement.data("touched") === true;

    if (!isTouched)
    {
        removeClassIfPresent(fieldElement, "is-valid");
        removeClassIfPresent(fieldElement, "is-invalid");
        removeClassIfPresent(iconElement, "active");
        return;
    }

    if (isValid)
    {
        removeClassIfPresent(fieldElement, "is-invalid");
        addClassIfAbsent(fieldElement, "is-valid");
        addClassIfAbsent(iconElement, "active");
    }

    else
    {
        removeClassIfPresent(fieldElement, "is-valid");
        addClassIfAbsent(fieldElement, "is-invalid");
        removeClassIfPresent(iconElement, "active");
    }
}

function isContactFormValid()
{
    /* Whether every contact field currently holds a valid value,
       regardless of whether it's been touched yet. */
    return Object.keys(contactFormFields).every(function(fieldKey) {
        const field = contactFormFields[fieldKey];
        return field.validate($(field.selector).val());
    });
}

function updateSubmitButtonState()
{
    /* The Send Message button stays disabled until every field is valid. */
    $("button#contact-form-btn").prop("disabled", !isContactFormValid());
}

function sendContactInfoToServer()
{
    /* Send the contact info to the server */

    // Grab the contact form
    const contactForm = $("form#contact-form");
    const contactFormBtn = $("button#contact-form-btn");

    // Wire up live validation on every field
    Object.keys(contactFormFields).forEach(function(fieldKey) {
        const field = contactFormFields[fieldKey];

        $(field.selector).on("input blur", function() {
            $(this).data("touched", true);
            updateFieldValidationUI(fieldKey);
            updateSubmitButtonState();
        });
    });

    updateSubmitButtonState();

    // Listen for the submit event
    contactForm.on("submit", function(e) {
        // Prevent default event
        e.preventDefault();

        if (!isContactFormValid())
        {
            return; // The submit button should already be disabled in this case
        }

        // Grab required data from elements
        const name = $("input#name").val();
        const email = $("input#email").val();
        const subject = $("input#subject").val();
        const message = $("textarea[name='message']").val();

        // ONLY SEND AJAX REQUEST WHEN THE BUTTON DOES NOT HAVE A SPINNER

        // Provide an AJAX request in order to submit this to the back-end
        if (!contactFormBtn.is(":has(span.spinner-border)"))
        {
            $.ajax({
                url: contactBackEndProcessorLink,
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify({
                    "name" : name,
                    "email" : email,
                    "subject": subject,
                    "message": message
                }),
                beforeSend: function() {
                    contactFormBtn.prop("disabled", true);
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
                    updateSubmitButtonState();
                }
            });
        }
    });

}