export function parseCSV(text: string): string[][] {
  const result: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let inQuotes = false;
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];
    
    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Double quotes inside quotes means an escaped single double-quote
        cell += '"';
        i++; // Skip the next quote
      } else {
        // Toggle quote state
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      row.push(cell.trim());
      cell = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++; // Skip the '\n'
      }
      row.push(cell.trim());
      result.push(row);
      row = [];
      cell = '';
    } else {
      cell += char;
    }
  }
  
  if (cell || row.length > 0) {
    row.push(cell.trim());
    result.push(row);
  }
  
  return result;
}

export function csvToObjects<T>(text: string): T[] {
  const rows = parseCSV(text);
  if (rows.length === 0) return [];
  
  const headers = rows[0].map(h => h.replace(/^"|"$/g, '').trim().toLowerCase());
  const objects: T[] = [];
  
  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    // Skip empty lines
    if (row.length === 0 || (row.length === 1 && row[0] === '')) {
      continue;
    }
    
    const obj: any = {};
    for (let c = 0; c < headers.length; c++) {
      let val = row[c] || '';
      // Clean up cell quotes and trailing/leading quotes if double-parsed
      val = val.replace(/^"|"$/g, '');
      obj[headers[c]] = val;
    }
    objects.push(obj as T);
  }
  
  return objects;
}
