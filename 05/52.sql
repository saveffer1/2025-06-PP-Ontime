SELECT
  i.Item_ID,
  i.Description
FROM Inventory AS i
WHERE NOT EXISTS (
  SELECT 1
  FROM OrderItem AS oi
  JOIN "Order" AS o
    ON oi.Order_ID = o.Order_ID
  WHERE oi.Item_ID = i.Item_ID
    AND o.Order_Date >= CURRENT_DATE - INTERVAL '3' MONTH
);
