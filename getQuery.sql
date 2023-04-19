SELECT * FROM makeupItems
ORDER BY quantity,
	CASE rating
		WHEN '1' THEN 1
		WHEN '2' THEN 2
		WHEN '3' THEN 3
        WHEN '4' THEN 4
		ELSE 5
	END;

CREATE TABLE makeupItems (
    makeupItem_id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    quantity BOOLEAN DEFAULT false
);

INSERT INTO makeupItems (name, quantity)
VALUES ('Sample 1', 1), ('Sample 2', 1);