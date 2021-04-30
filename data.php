<?php

$errors = []; // Errors were build in a array
$errorMessage = '';

if (!empty($_POST)) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $telefoon = $_POST['telfoon'];
    $message = $_POST['message'];

    if (empty($name)) {
        $errors[] = 'Naam is leeg';
    }

    if (empty($email)) {
        $errors[] = 'Email is leeg';
    } else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Geen correct email';
    }

    if (empty($message)) {
        $errors[] = 'Message is empty';
    }


    if (empty($errors)) {
        $toEmail = 'bryan.batselier@student.Hogent.be';
        $emailSubject = 'New email from your contant form';
        $headers = ['From' => $email, 'Reply-To' => $email, 'Content-type' => 'text/html; charset=iso-8859-1'];

        $bodyParagraphs = ["Name: {$name}", "Email: {$email}", "Message:", $message];
        $body = join(PHP_EOL, $bodyParagraphs);

        if (mail($toEmail, $emailSubject, $body, $headers)) {
            header('Location: thank-you.html');
        } else {
            $errorMessage = 'Oops, something went wrong. Please try again later';
        }
    } else {
        $allErrors = join('<br/>', $errors);
        $errorMessage = "<p style='color: red;'>{$allErrors}</p>";
    }
}

?>