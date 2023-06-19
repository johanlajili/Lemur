# Lemur

Lemur is a React Native client for Lemmy, a federated link aggregator. The goal of this project is to make it easy for users to access and interact with the Lemmy community on mobile devices. This project was started by Johan Lajili.

![image](https://github.com/johanlajili/Lemur/assets/1099219/c0c56be1-e2b3-4a6d-9b83-f52d161159f1)

## Table of Contents

- [License](#license)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Join the Community](#join-the-community)
- [Creating Issues](#creating-issues)
- [Contribution](#contribution)
- [NPM Scripts](#npm-scripts)
- [Contact](#contact)

## License



This project is licensed under the MIT License. For more details, please refer to the [LICENSE](LICENSE) file in the root of the repository.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed the latest version of Node.js and yarn.
- You have read the [Lemmy documentation](https://join-lemmy.org/docs/).
- You have a basic understanding of JavaScript and React Native.

## Installation

To install Lemur, follow these steps:

1. Clone the repo
    ```
    git clone https://github.com/johanlajili/lemur.git
    ```

2. Navigate to the project directory
    ```
    cd lemur
    ```

3. Install NPM packages
    ```
    yarn install
    ```

4. Run the app
    ```
    yarn start
    ```


## Creating Issues

If you encounter any bugs or want to suggest a new feature, please create an issue in the [issue tracker](https://github.com/johanlajili/lemur/issues). When creating an issue, please follow the issue templates provided to facilitate communication and resolution.

## Contribution

Please read through our [contributing guidelines](CONTRIBUTING.md). Included are directions for opening issues, coding standards, and notes on development.

## NPM Scripts

The following npm scripts are available:

- `npm start`: Starts the app in development mode using Expo. It will reload if you save edits to your files, and you will see build errors and logs in the console.
- `npm run android`: Like `npm start`, but it also attempts to open the app in an Android emulator or a connected Android device.
- `npm run ios`: Similar to `npm start`, but it attempts to open the app in an iOS emulator or a connected iOS device. You need to be on a Mac and have it installed to use this script.
- `npm run web`: Similar to `npm start`, but it attempts to open your app in a web browser. # note that the web version currently does not work because of CORS issue.

Please note that there are no `npm test`, `npm run build`, and `npm run eject` scripts available in this project as per the package.json file.

## Contact

If you have any questions about the project, please feel free to [contact Johan Lajili](mailto:johan.lajili@gmail.com) or create an issue in the [issue tracker](https://github.com/johanlajili/lemur/issues).
