# GulpStart Package

## Overview
The GulpStart Package is a convenient starter kit for web development projects that leverages the power of the Gulp task runner. This package simplifies the initiation and management of web projects by offering a robust set of tools and configurations designed for modern web development.

## Features
- **Sass/SCSS to CSS**: Automates the transformation of Sass/SCSS files into CSS, streamlining your styling workflow.
- **Live Reloading**: Enables live reloading to immediately reflect changes in the browser, enhancing the development experience.
- **Image Optimization**: Provides tools for optimizing images to reduce file sizes while maintaining quality, leading to faster web page load times.
- **JavaScript Minification**: Includes JavaScript minification to decrease file sizes and improve website performance.
- **Error Handling**: Incorporates error handling mechanisms to maintain smooth workflow during development.
- **Browser Compatibility**: Focuses on ensuring compatibility across various browsers, essential for creating accessible web applications.
- **SVG Processing**: Now includes support for optimizing SVG files and creating SVG sprites.
- **Enhanced Image Handling**: Added support for AVIF and WebP formats for better image optimization.

# Dependencies
The GulpStart Package includes several dependencies to enhance your web development workflow. Below is a brief description of each plugin used in the package:

- **browser-sync (^3.0.2)**: Automates the reloading of your web browser when files change. It's a powerful tool for testing your site across multiple devices and browsers in real-time.
- **gulp (^4.0.2)**: A toolkit to automate & enhance your workflow. Gulp provides a streaming build system, making it easier and faster to build and test web applications.
- **gulp-autoprefixer (^9.0.0)**: A CSS post-processor that parses your CSS and adds vendor prefixes to CSS rules using values from the Can I Use website. It ensures cross-browser compatibility of your styles.
- **gulp-clean (^0.4.0)**: A plugin to remove files and folders as part of your Gulp build process. It's typically used to clean the output directory before building a new version of your website.
- **gulp-concat (^2.6.1)**: Concatenates files into a single file. It's often used to combine multiple JavaScript or CSS files into one, reducing HTTP requests and improving load times.
- **gulp-sass (^5.1.0)**: A Gulp plugin to compile Sass files into CSS. It leverages Sass, a powerful CSS pre-processor, to help write more maintainable and scalable stylesheets.
- **gulp-uglify-es (^3.0.0)**: A JavaScript minifier based on the UglifyJS3 toolkit. This plugin reduces the size of your JavaScript files by removing unnecessary characters, making your website faster to load.
- **sass (^1.70.0)**: A powerful and professional grade CSS extension language. Sass provides more advanced mechanisms for writing CSS, such as variables, nesting, and mixins, which makes maintaining CSS much more efficient.


## Installation
To start using the GulpStart Package, clone the repository and install the required dependencies, if you accidentally deleted the `node_modules` folder, you can easily restore it by also running:

```bash
git clone https://github.com/Vzhukovskaya/GulpStart.package.git
cd GulpStart.package
npm install
Usage
Run the Gulp tasks with the following command:

bash
Copy code
gulp

