WITH item_profit AS (
  SELECT
    i.Item_ID,
    i.Description,
    i.Category_ID,
    SUM( (oi.Sale_Price - i.Cost) * oi.Quantity ) AS profit
  FROM Inventory AS i
  JOIN OrderItem AS oi
    ON i.Item_ID = oi.Item_ID
  GROUP BY
    i.Item_ID, i.Description, i.Category_ID
),
category_avg AS (
  SELECT
    Category_ID,
    AVG(profit) AS avg_profit
  FROM item_profit
  GROUP BY Category_ID
)
SELECT
  ip.Item_ID,
  ip.Description,
  ip.profit,
  ca.avg_profit
FROM item_profit AS ip
JOIN category_avg AS ca
  ON ip.Category_ID = ca.Category_ID
WHERE ip.profit > ca.avg_profit;
