# Github Pull Request Viewer

## Build & development

- Run `grunt` for building and `grunt serve` for preview.

- To view Github data, you'll need an access token. 
    - You can generate one by following the information [here](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/).
    - Ensure the following scopes are added:
        - all 'repo' scopes are granted. 
        - ['read:org'], under admin:org
    - Once you generate the access token, open javascript file services/environment-vars.js, and properly set `GITHUB_ACCESS_TOKEN`.

## Resources

- For an interactive console to test queries, view the Github v4 explorer: https://developer.github.com/v4/explorer/

- The pull-request documentation is located here: https://developer.github.com/v4/reference/object/pullrequest/

## Testing

Running `grunt test` will run the unit tests with karma.

## Build Notes

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.16.0.
