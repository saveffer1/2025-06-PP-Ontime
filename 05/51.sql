SELECT
  i.Item_ID,
  i.Description,
  i.Quantity_On_Hand
FROM Inventory i
WHERE i.Quantity_On_Hand < (
  SELECT AVG(total_qty) * 0.1
  FROM (
    SELECT SUM(Quantity) AS total_qty
    FROM OrderItem
    GROUP BY Item_ID
  ) AS t
);
