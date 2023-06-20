$(function() {

    $("#emailForm #eemail,#ephone,#emessage").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            $("#emailModal #sendEmailButton").html('Sending...');
            $("#emailModal #sendEmailButton").prop('disabled', true);
            // get values from FORM
            var name = "N/A";
            var email = $("#emailModal input#eemail").val();
            var company = "N/A";
            var phone = $("#emailModal input#ephone").val();
            var message = $("#emailModal textarea#emessage").val();
            var promocode = "N/A"
            
            let data = {
                name: name,
                company: company,
                phone: phone,
                email: email,
                message: message,
                promocode: promocode
            };
            try {
                fetch("https://script.google.com/macros/s/AKfycbwPGoJMSk1lgEKTrfHhvfTdzBZ5XZru5rYi__jdvKByQo54piMYanlurpXf6c-dJ1Bi/exec", {
                    method: 'POST',
                    body: JSON.stringify(data),
                    redirect: "follow",
                    headers: {
                        'Content-Type': 'text/plain;charset=utf-8',
                    }
                }).then(res => {
                    if (!res.ok) {
                        window.gtag('event', 'email_form_submission_fail');
                    }
                    else{
                        window.gtag('event', 'email_form_submission_success');
                    }
    
                }).catch((error) => {
                    window.gtag('event', 'email_form_submission_error');
                }).finally(
                    () => {
                        $('#emailModal #emailForm').trigger("reset");
                        $("#emailModal #sendEmailButton").html('Send');
                        $("#emailModal #sendEmailButton").prop('disabled', false);
                        $("#emailModal").modal("hide");

                        // Construct mailto link
                        var mailtoLink = "mailto:" + encodeURIComponent("accounts@victoryexperts.net") +
                                        "?subject=" + encodeURIComponent("Services enquiry from "+email+" ("+phone+")") +
                                        "&body=" + encodeURIComponent(message);

                        // Open user's default email client
                        window.location.href = mailtoLink;
                    }
                );
            } catch (error) {
                window.gtag('event', 'email_form_submission_error');
                $('#emailModal #emailForm').trigger("reset");
                $("#emailModal #sendEmailButton").html('Send');
                $("#emailModal #sendEmailButton").prop('disabled', false);
                $("#emailModal").modal("hide");

                // Construct mailto link
                var mailtoLink = "mailto:" + encodeURIComponent("accounts@victoryexperts.net") +
                                "?subject=" + encodeURIComponent("Services enquiry from "+email+" ("+phone+")") +
                                "&body=" + encodeURIComponent(message);

                // Open user's default email client
                window.location.href = mailtoLink;
            }
            
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });


    //send email submit
    $("#sendEmailButton").click(function() {
        // Trigger the form's submit event
        $("#emailForm").submit();
    });

});
