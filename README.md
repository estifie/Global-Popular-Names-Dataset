# Global Popular Names Dataset

## Description

The Global Popular Names Dataset contains 45,769 unique names categorized into 55 origins. While the dataset does not
contain all countries in the world, it does contain the most well-known countries and some other origins that contain
multiple countries. Each entry in the dataset contains the following columns:

- `name`: The name itself.
- `gender`: Indicates the gender associated with the name. This field can have seven different values:
  - `M`: Male name
  - `1M`: Male name, if the first part of the name. Otherwise, it denotes a name mostly associated with males.
  - `?M`: Mostly male name, which is essentially a unisex name but leans more towards being associated with males.
  - `F`: Female name
  - `1F`: Female name, if the first part of the name. Otherwise, it denotes a name mostly associated with females.
  - `?F`: Mostly female name, which is essentially a unisex name but leans more towards being associated with females.
  - `?`: Unisex name, indicating that it is not predominantly associated with either
- `origin`: The origin of the name. The dataset contains the following origins:
  - See the [Origins](origins.md) page for more details and the full list of origins.

This dataset is useful for analyzing the popularity of names across different countries and regions. It can be used to
study naming trends, cultural influences on names, and gender associations with names. The dataset can also be used to
generate insights into the diversity of names across different origins.

## Dataset

The dataset utilized in this project originates from the "List of first names and gender",compiled by Jörg MICHAEL in
2007-2008. The dataset was originally distributed under the GNU Free Documentation License, Version 1.2, or any later
version published by the Free Software Foundation.

Due to the age of the dataset, it may not reflect current naming trends. However, it still provides valuable insights
into the popularity of names across different origins.

The original dataset was hosted at the following URL: [Database Link](ftp://ftp.heise.de/pub/ct/listings/0717-182.zip)

Unfortunately, the original dataset is no longer available at the above URL. However, the dataset has been preserved at
the following URL:
[Archive Link](https://web.archive.org/web/20200414235453/ftp://ftp.heise.de/pub/ct/listings/0717-182.zip)

It's important to highlight that while the original dataset was provided in a text format (`.txt`), our dataset has been
converted to a CSV format (`.csv`) and JSON format (`.json`) for easier processing and analysis.

For any inquiries or remarks regarding this dataset, please contact me at
[ertusari@icloud.com](mailto:ertusari@icloud.com)

## Provided Files

### `original_data.txt`

This file contains the original dataset in a text format (`.txt`). While this format may not be suitable for direct use,
it preserves the original data as compiled by Jörg MICHAEL. You can use this file as an input to convert the data into
JSON (`.json`) or CSV (`.csv`) format using our provided scripts for easier processing.

See the [Converting Data](#converting-data) section for more details on how to convert the data.

### `data` folder

The `data` folder contains the dataset converted into multiple formats. It includes the following files:

- `global_popular_names.csv`: The dataset in CSV format (`.csv`). Click [here](data/global_popular_names.csv) to view
  the dataset.
- `global_popular_names.json`: The dataset in JSON format (`.json`). Click [here](data/global_popular_names.json) to
  view the dataset.

- `global_popular_names_min.csv`: The dataset in CSV format (`.csv`) with origin column's values shortened. Click
  [here](data/global_popular_names_min.csv) to view the dataset.
- `global_popular_names_min.json`: The dataset in JSON format (`.json`) with origin column's values shortened. Click
  [here](data/global_popular_names_min.json) to view the dataset.

These files are processed versions of the original dataset and you can use them directly.

## Converting Data

If you wish to convert the original dataset into CSV or JSON format, you can use the provided scripts. The scripts are
written in TypeScript and require Node.js to run.

### Prerequisites

Before running the scripts, ensure you have Node.js installed on your system. You can download Node.js from the official
website: [https://nodejs.org/](https://nodejs.org/)

### Steps

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/axelnt/Global-Popular-Names-Dataset.git
   ```

2. Navigate to the project directory:

   ```bash
    cd Global-Popular-Names-Dataset
   ```

3. Install the dependencies:

   ```bash
    npm install
   ```

4. Run the conversion script:

   There are arguments that needs to be passed to the script.

   - `--input`: The path to the original dataset file (`.txt`). This is a required argument. As an example, you can use
     the provided `original_data.txt` file in the project directory.
   - `--output`: The path to the output file. This is an optional argument. If not provided, the output file will be
     saved with the default name in the `data` folder. You can specify whether you want to output the data in CSV or
     JSON format by providing the file extension (`.csv` or `.json`). If you don't provide the file extension, the
     script will output the data in JSON format by default.
   - `--minify`: If you want to shorten the origin column's values, you can pass this argument. This is an optional
     argument. If provided, the origin column's values will be shortened. This is useful if you want to reduce the size
     of the dataset. By default, the origin column's values are not shortened.
   - `--start-line`: Probably you will not need this argument. It is already set as default. But if you change the
     original dataset, you can use this argument to specify the line number where the data starts. This is an optional
     argument.
   - `--help`: If you want to see the help message, you can pass this argument. This is an optional argument.

   Here is an example of how to run the conversion script:

   ```bash
    npm run convert -- --input=original_data.txt --output=./data/global_popular_names.csv
   ```

   This command will convert the original dataset into CSV format and save it as `global_popular_names.csv` in the
   `data` folder.

   If you want to convert the data into JSON format, you can run the following command:

   ```bash
    npm run convert -- --input=original_data.txt --output=./data/global_popular_names.json
   ```

   If you want to shorten the origin column's values, you can pass the `--minify` argument:

   ```bash
    npm run convert -- --input=original_data.txt --output=./data/global_popular_names_min.csv --minify
   ```

   ```bash
    npm run convert -- --input=original_data.txt --output=./data/global_popular_names_min.json --minify
   ```

   If you want to see the help message, you can pass the `--help` argument:

   ```bash
    npm run convert -- --help
   ```

## Acknowledgements

We would like to thank Jörg MICHAEL for compiling the original dataset and making it available to the public. We would
also like to thank the Internet Archive for preserving the dataset and making it accessible to future generations.

## License

The Global Popular Names Dataset is made available under the GNU Free Documentation License, Version 1.2. You are free
to share and adapt the dataset for any purpose, provided that you give appropriate credit to the original author and
source. You must also indicate if any changes were made to the dataset.
