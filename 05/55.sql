SELECT c.Customer_ID, c.Name
FROM (
  SELECT 
    oi.Customer_ID,
    SUM(oi.Quantity*oi.Sale_Price) AS totJA,
    RANK() OVER(ORDER BY SUM(oi.Quantity*oi.Sale_Price) DESC) AS rk
  FROM "Order" o
  JOIN OrderItem oi ON o.Order_ID=oi.Order_ID
  WHERE o.Order_Date BETWEEN '2025-06-01' AND '2025-08-31'
  GROUP BY oi.Customer_ID
) AS ja
CROSS JOIN (
  SELECT SUM(oi.Quantity*oi.Sale_Price) AS totDec
  FROM "Order" o
  JOIN OrderItem oi ON o.Order_ID=oi.Order_ID
  WHERE o.Order_Date BETWEEN '2024-12-01' AND '2024-12-31'
) AS dec
JOIN Customer c ON c.Customer_ID=ja.Customer_ID
WHERE ja.rk <= 5
  AND ja.totJA >= dec.totDec * 0.1;
