# Github Pull Request Viewer

## Build & development

- Run `grunt` for building and `grunt serve` for preview.

- To view Github data, you'll need an access token. 
    - You can generate one by following the information [here](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/).
    - Ensure the following scopes are added:
        - all 'repo' scopes are granted. 
        - ['read:org'], under admin:org
    - Once you generate the access token, store in an environment variable named `GITHUB_ACCESS_TOKEN`

## Testing

Running `grunt test` will run the unit tests with karma.

## Build Notes

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.16.0.
