import node from 'rollup-plugin-node-resolve';

export default {
    input: './dist/src/index.js',
    output: [{
        file: './dist/bundle/smart-table-events.js',
        format: 'iife',
        name: 'smartTableEvents',
        sourcemap: true
    }, {
        file: './dist/bundle/smart-table-events.es.js',
        format: 'es',
        sourcemap: true
    }],
    plugins: [node()]
};
