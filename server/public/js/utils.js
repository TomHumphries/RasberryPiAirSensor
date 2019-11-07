function csvToPoints(csvStr) {
    const lines = csvStr.split('\n')
    const result = []
    for (let i = 0; i < lines.length; i++) {        
        if (!lines[i])
            continue

        const currentline = lines[i].split(',');
        result.push({
            x: currentline[0],
            y: currentline[1]
        })
    }
    return result
}