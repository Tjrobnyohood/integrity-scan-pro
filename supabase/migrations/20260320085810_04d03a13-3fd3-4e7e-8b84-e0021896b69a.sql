UPDATE tithe_tech_progress SET current_cycle_count = 0, total_churches_served = 0, updated_at = now() WHERE id = 'cca640c4-e175-4c19-b0c7-a526b283af67';
DELETE FROM tithe_tech_recipients;