# translate content.txt into projects.html

with open('content.txt', 'r') as f:
    lines = []
    for line in f:
        line = line.strip()
        if len(line) > 0:
            lines.append(line)

    # create html file
    with open('projects.html', 'w') as g:
        for i in range(len(lines)):
            # opening html boilerplate
            if i == 0:
                g.write('<!doctype html>\n')
                g.write('<head>\n')
                g.write('  <link rel="stylesheet" href="style.css">')
                g.write('</head>\n')
                g.write('<body>\n')
                g.write('<div class="header">')
                g.write('<h1>Brandon\'s Projects</h1>')
                g.write('<h3><a href="https://github.com/ImanariRoll">github.com/ImanariRoll</a><h3>')
                g.write('</div>')
                g.write('<div class="table-container">\n')
                g.write('  <table>\n')
                

            # opening table rows
            if i % 4 == 0:
                g.write('    <tr>\n')

            # table headings/data
            if i < 4:
                g.write(f'      <th>{lines[i]}</th>\n')
            else:
                g.write(f'      <td>{lines[i]}</td>\n')
            
            # closing table rows
            if i % 4 == 3:
                g.write('    </tr>\n')

            # closing html boilerplate
            if i == len(lines)-1:
                g.write('  </table>\n')
                g.write('</div>')
                g.write('</body>\n')
                g.write('</html>\n')



                
                




