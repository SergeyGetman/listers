import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Box, Typography } from '@mui/material';

export default {
  title: 'Typography',
  component: Typography,
} as ComponentMeta<typeof Typography>;

const Template: ComponentStory<typeof Typography> = () => (
  <Box>
    <Typography variant="h1">h1. Heading</Typography>
    <Typography variant="h2">h2. Heading</Typography>
    <Typography variant="h3">h3. Heading</Typography>

    <Typography variant="extra_large_bolt">
      extra large bolt. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
    </Typography>

    <Typography variant="extra_large">
      extra large. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
    </Typography>

    <Typography variant="large_bolt">
      large bolt. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
    </Typography>

    <Typography variant="large">
      large. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
    </Typography>

    <Typography variant="default_bolt">
      default bolt. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
    </Typography>

    <Typography variant="default">
      default. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
    </Typography>

    <Typography variant="small_bolt">
      small bolt. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
    </Typography>

    <Typography variant="small">
      small. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
    </Typography>

    <Typography variant="extra_small_bolt">
      ultra small bolt. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
    </Typography>

    <Typography variant="extra_small">
      extra small. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
    </Typography>
    <br />
  </Box>
);

export const TypographyVariants = Template.bind({});
