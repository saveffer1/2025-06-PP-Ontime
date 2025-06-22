SELECT
  e.Name
FROM Employee AS e
WHERE NOT EXISTS (
  SELECT 1
  FROM "Order" AS o
  JOIN OrderItem AS oi
    ON o.Order_ID = oi.Order_ID
  WHERE o.Employee_ID = e.Employee_ID
    AND o.Order_Date >= DATE '2025-06-01'
    AND o.Order_Date <  DATE '2025-08-01'
);
