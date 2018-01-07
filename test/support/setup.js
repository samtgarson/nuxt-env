import path from 'path'
import retell from 'retell'

// use `record` to record API calls, or `replay` to use existing fixtures
retell.mode = 'replay'
retell.fixtures = path.resolve(__dirname, 'fixtures')

