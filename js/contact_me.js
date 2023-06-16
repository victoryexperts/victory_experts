$(function() {

    $("#contactformsec input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            $("#contactformsec #contactButton").html('Sending...');
            $("#contactformsec #contactButton").prop('disabled', true);
            // get values from FORM
            var name = $("#contactformsec input#name").val();
            var email = $("#contactformsec input#email").val();
            var company = $("#contactformsec input#companyName").val();
            var phone = $("#contactformsec input#phone").val();
            var message = $("#contactformsec textarea#message").val();
            var promocode = $("#contactformsec input#promocode").val();
            
            if (company === null) {
                company = "";
            }

            if (promocode === null) {
                promocode = "";
            }
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            let data = {
                name: name,
                company: company,
                phone: phone,
                email: email,
                message: message,
                promocode: promocode
            };
            try {
                fetch("https://script.google.com/macros/s/AKfycbzBcd_c7zpn6iCBJxSFuWm8IkX8oXqNhCtdtNz3I0dkCiByZcuthxsgs7fav-QLQlL8/exec", {
                    method: 'POST',
                    body: JSON.stringify(data),
                    redirect: "follow",
                    headers: {
                        'Content-Type': 'text/plain;charset=utf-8',
                    }
                }).then(res => {
                    if (!res.ok) {
                        // Fail message
                        $('#contactformsec #success').html("<div class='alert alert-danger'>");
                        $('#contactformsec #success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                        $('#contactformsec #success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
                        $('#contactformsec #success > .alert-danger').append('</div>');
                        //clear all fields
                        //$('#contactForm').trigger("reset");
                        window.gtag('event', 'form_submission_fail');
                    }
                    else{
                        // Success message
                        $('#contactformsec #success').html("<div class='alert alert-success'>");
                        $('#contactformsec #success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                        $('#contactformsec #success > .alert-success')
                            .append("<strong>Your message has been sent. </strong>");
                        $('#contactformsec #success > .alert-success')
                            .append('</div>');
    
                        //clear all fields
                        //$('#contactForm').trigger("reset");
                        window.gtag('event', 'form_submission_success');
                    }
    
                    // $("#contactButton").html('Send Message');
                    // $("#contactButton").prop('disabled', false);
    
                }).catch((error) => {
                    window.gtag('event', 'form_submission_error');
                }).finally(
                    () => {
                        $('#contactformsec #contactForm').trigger("reset");
                        $("#contactformsec #contactButton").html('Send Message');
                        $("#contactformsec #contactButton").prop('disabled', false);
                    }
                );
            } catch (error) {
                window.gtag('event', 'form_submission_error');
                $('#contactformsec #contactForm').trigger("reset");
                $("#contactformsec #contactButton").html('Send Message');
                $("#contactformsec #contactButton").prop('disabled', false);
            }
            
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#contactformsec #name').focus(function() {
    $('#contactformsec #success').html('');
});
