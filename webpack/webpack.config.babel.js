import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { resources } from './sass-resource.babel';
import { config as appConfig } from '../src/app/config';
import TsconfigPathPlugin from 'tsconfig-paths-webpack-plugin';

const rootDir = process.cwd();
const outputPath = path.join(rootDir, './static');

export const regexExtensions = {
  javascript: /\.tsx?$/,
  scss: /\.(scss|sass)$/,
  source: /\.(png|jpg|jpeg|icon|webp|gif|mp4|woff|woff2|ttf|eot|svg)$/,
};

const config = {
  context: rootDir,

  output: {
    path: outputPath,
    publicPath: appConfig.staticPublicPath,
    filename: '[name].js',
    chunkFilename: '[name].js',
  },

  module: {
    rules: [
      {
        test: regexExtensions.javascript,
        loader: 'ts-loader',
        type: 'javascript/auto',
      },

      {
        test: regexExtensions.scss,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[name]__[local]--[hash:base64]',
                sourceMap: true,
                camelCase: true,
                // importLoaders: 2,
              },
            },
            {
              loader: 'postcss-loader',
              ident: 'postcss',
              options: {
                sourceMap: true,
                plugins: [
                  require('autoprefixer')(),
                  require('postcss-assets')({
                    basePath: './src',
                    loadPaths: ['assets/'],
                    relative: true,
                  }),
                ],
              },
            },
            {
              loader: 'sass-loader',
              options: {
                outputStyle: 'expanded',
                sourceMap: true,
                sourceMapComment: true,
                sourceComments: true,
              },
            },
            {
              loader: 'sass-resources-loader',
              options: {
                resources,
              },
            },
          ],
        }),
      },

      {
        test: regexExtensions.source,
        loader: 'url-loader',
        options: {
          limit: 8000,
          outputPath: 'assets/',
          name: '[path]--[name].[ext]',
          publicPath: appConfig.staticPublicPath + 'assets/',
        },
        exclude: ['node_modules'],
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('stylesheets/[name].css'),
  ],

  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    modules: [
      path.join(rootDir, './src'),
      path.join(rootDir, './node_modules')],
    alias: {
      '@components': path.resolve(rootDir, 'src/components'),
      '@containers': path.resolve(rootDir, 'src/containers'),
      '@helps': path.resolve(rootDir, 'src/helps'),
      '@assets': path.resolve(rootDir, 'src/assets'),
      '@homeComponents': path.resolve(rootDir, 'src/routes/Home/components'),
      '@videoComponents': path.resolve(rootDir, 'src/routes/Video/components'),
      '@patterns': path.resolve(rootDir, 'src/patterns'),
      '@mixins': path.resolve(rootDir, 'src/mixins'),
    },
    plugins: [
      new TsconfigPathPlugin({
        configFile: path.join(rootDir, './tsconfig/base.json'),
      })],
  },
};

export default config;
