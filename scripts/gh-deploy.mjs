// const execa = require('execa');
import { execa } from 'execa';

(async () => {
    try {
        await execa('git', ['checkout', '--orphan', 'gh-pages']);
        // eslint-disable-next-line no-console
        console.log('Building...');
        await execa('npm', ['run', 'build']);
        await execa('git', ['--work-tree', 'dist', 'add', '--all']);
        await execa('git', ['--work-tree', 'dist', 'commit', '-m', 'gh-pages']);
        // eslint-disable-next-line no-console
        console.log('Pushing to gh-pages...');
        await execa('git', ['push', 'origin', 'HEAD:gh-pages', '--force']);
        await execa('rm', ['-r', 'dist']);
        await execa('git', ['checkout', '-f', 'master']);
        await execa('git', ['branch', '-D', 'gh-pages']);
        // eslint-disable-next-line no-console
        console.log('Successfully deployed');
    } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e.message);
        process.exit(1);
    }
})();
