USE samplevaultest;

DROP PROCEDURE IF EXISTS sp_delete_user;
DROP PROCEDURE IF EXISTS sp_delete_sample;

DELIMITER //

CREATE PROCEDURE sp_delete_user(IN p_id INT)
BEGIN
    DELETE FROM users WHERE id = p_id;
    SELECT ROW_COUNT() AS affectedRows;
END //

CREATE PROCEDURE sp_delete_sample(IN p_id INT, IN p_user_id INT)
BEGIN
    DELETE FROM samples WHERE id = p_id AND user_id = p_user_id;
    SELECT ROW_COUNT() AS affectedRows;
END //

DELIMITER ;
