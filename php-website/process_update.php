<?php
session_start();
require_once 'dbconn.php';

if (isset($_POST['submit'])) {
    $file = $_FILES['updateFile'];

    //$file: array -> key: name, type, tmp_name, error, size
    $fileName = $_FILES['updateFile']['name'];
    $fileType = $_FILES['updateFile']['type'];
    $fileTmpName = $_FILES['updateFile']['tmp_name'];
    $fileError = $_FILES['updateFile']['error'];
    $fileSize = $_FILES['updateFile']['size'];


    $fileExt = explode('.', $fileName);
    $fileActualExt = strtolower(end($fileExt));
    $allowed = array('jpg', 'jpeg', 'png', 'jfif');

    if (in_array($fileActualExt, $allowed)) {
        if ($fileError === 0) {
            if ($fileSize < 1000000) {
                $fileNameNew = uniqid('', true) . "." . $fileActualExt;
                $fileDestination = 'upload_file/' . $fileNameNew;
                move_uploaded_file($fileTmpName, $fileDestination);

                settype($_POST['id'], 'integer');
                $filtered = array(
                    'id' => mysqli_real_escape_string($conn, $_POST['id']),
                    'category' => mysqli_real_escape_string($conn, $_POST['subject_id']),
                    'title' => mysqli_real_escape_string($conn, $_POST['title']),
                    'content' => mysqli_real_escape_string($conn, $_POST['content'])
                );

                $sql = "update board 
                        set 
                        category = '{$filtered['category']}',
                        title = '{$filtered['title']}',
                        content = '{$filtered['content']}',
                        filename = '$fileNameNew'
                        where
                        id = {$filtered['id']}
                        ";

                $result = mysqli_query($conn, $sql);
                if ($result === false) {
                    // mysqli_error($conn);
                    echo "error in saving data. Talk to admin.";
                    error_log(mysqli_error($conn)); // 아파치 로그에 에러가 저장됨.
                } else {
                    // echo 'succeeded. <br><a href="index.php">back</a>';
                    header('Location: index.php');
                }

                // echo $sql;

            } else {
                echo 'Your file is too big!';
            }
        } else {
            echo 'There was an error uploading your file!';
        }
    } else {
        echo 'Upload a file or you cannot upload files of this type!';
    }
}
