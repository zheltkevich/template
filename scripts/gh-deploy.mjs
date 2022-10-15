import { execa } from 'execa';

(async () => {
    try {
        await execa('git', ['checkout', '--orphan', 'gh-pages']);
        console.log('Building...'); // eslint-disable-line no-console
        await execa('npm', ['run', 'build']);
        await execa('git', ['--work-tree', 'dist', 'add', '--all']);
        await execa('git', ['--work-tree', 'dist', 'commit', '-m', 'gh-pages']);
        console.log('Pushing to gh-pages...'); // eslint-disable-line no-console
        await execa('git', ['push', 'origin', 'HEAD:gh-pages', '--force']);
        await execa('rm', ['-r', 'dist']);
        await execa('git', ['checkout', '-f', 'master']);
        await execa('git', ['branch', '-D', 'gh-pages']);
        console.log('Successfully deployed'); // eslint-disable-line no-console
    } catch (e) {

        console.log(e.message); // eslint-disable-line no-console
        process.exit(1);
    }
})();
