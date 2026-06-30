/**
 * Fos Logo Generator — High Jump Illustration via Gemini API
 * ES Module version (for projects with "type": "module" in package.json)
 * 
 * This script calls Google's Gemini 2.0 Flash model to generate a custom
 * high-jump illustration for the Fos app logo. The generated image will
 * have a scrapbooking/hand-drawn aesthetic with warm, organic colors
 * (peachy, mint, jade, navy).
 * 
 * Prerequisites:
 * 1. Node.js installed
 * 2. Gemini API key from Google AI Studio (https://aistudio.google.com/app/apikey)
 * 3. Install: npm install axios dotenv
 * 4. package.json has "type": "module"
 * 
 * Usage:
 *   node gemini-fos-logo-generator-esm.js
 * 
 * The script will:
 * - Authenticate with your Gemini API key
 * - Send a detailed image generation prompt
 * - Receive the generated image as base64
 * - Save it as fos-logo.png
 * - Log the file path and size
 */

import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

// ============================================================================
// CONFIGURATION
// ============================================================================

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'YOUR_API_KEY_HERE';
const OUTPUT_DIR = './generated-logos';
const OUTPUT_FILENAME = 'fos-logo.png';
const OUTPUT_PATH = path.join(OUTPUT_DIR, OUTPUT_FILENAME);

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// ============================================================================
// DETAILED GENERATION PROMPT
// ============================================================================

const LOGO_PROMPT = `
You are a graphic designer specializing in athletic branding and hand-drawn illustration.

Generate a logo illustration of a high jump athlete mid-jump over a horizontal bar.

STYLE & AESTHETIC:
- Medium: Hand-drawn illustration, organic, slightly imperfect linework
- Technique: Clean vector-like lines but with character and natural imperfection
- Energy: Dynamic motion, not static — capture the moment of peak flight
- Mood: Warm, approachable, personal (like a scrapbook or mixed-media piece)

COMPOSITION:
- Subject: Athlete captured at the apex of a high jump
- Body position: 
  - One leg driving upward (knee bent at ~90 degrees)
  - One leg extended/following through
  - Arms in natural flight position (not stiff)
  - Head position: Looking forward/upward, natural
- Background: Horizontal bar clearly visible, implied ground plane
- Depth: Subtle layering, not flat

COLOR PALETTE (warm, organic):
- Primary figure: Warm peachy-tan skin tones
- Secondary clothing/contrast: Navy blue or deep blue (shirt/shorts/hair)
- Background: Mint or sage green, with soft, layered circular shapes (like bokeh or organic depth)
- Accents: Jade green highlights on the bar, clothing details, or shadows
- Overall warmth: Lean toward warm greens (minty) and peachy tones, avoid cool/bright colors

TECHNICAL REQUIREMENTS:
- High resolution (suitable for app icon usage at 192x192, 512x512)
- Clean edges, readable at small sizes
- Avoid photorealism — stay in the illustration realm
- Suitable for a fitness/athletic app logo

MOOD & FEELING:
This should feel like a personal, hand-crafted piece — something you'd see in a modern 
fitness brand that doesn't take itself too seriously but respects the discipline of the sport.
Think scrapbooking energy meets minimalist design.

FINAL OUTPUT:
A single, centered illustration of the athlete jumping. PNG format with a transparent or 
light background preferred.
`;

// ============================================================================
// GEMINI API REQUEST
// ============================================================================

async function generateLogo() {
  console.log('🎨 Fos Logo Generator');
  console.log('═'.repeat(60));

  // Validate API key
  if (GEMINI_API_KEY === 'YOUR_API_KEY_HERE') {
    console.error('❌ Error: GEMINI_API_KEY not set.');
    console.error('   Set it in a .env file or export GEMINI_API_KEY=<your_key>');
    process.exit(1);
  }

  console.log('📡 Connecting to Gemini API...');
  console.log(`   Output directory: ${OUTPUT_DIR}`);
  console.log(`   Output file: ${OUTPUT_FILENAME}\n`);

  try {
    // Construct the API request
    const requestUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

    const requestPayload = {
      contents: [
        {
          parts: [
            {
              text: LOGO_PROMPT
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.85, // Balanced between creative and consistent
        maxOutputTokens: 4096, // Allow detailed image generation
        topP: 0.95,
        topK: 64
      }
    };

    console.log('⏳ Sending request to Gemini...');
    const response = await axios.post(requestUrl, requestPayload, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 60000 // 60 second timeout
    });

    console.log('✅ Request successful!\n');

    // =========================================================================
    // PARSE RESPONSE
    // =========================================================================

    const responseText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!responseText) {
      throw new Error('No content in Gemini response. Check API quota and permissions.');
    }

    console.log('📋 Gemini Response:');
    console.log('─'.repeat(60));
    console.log(responseText);
    console.log('─'.repeat(60));
    console.log('\n');

    // Check if response contains an image (base64) or a description
    if (responseText.includes('data:image') || /^[A-Za-z0-9+/=]+$/.test(responseText.substring(0, 100))) {
      // Likely base64 image data
      let imageData = responseText;
      
      // Strip data URI prefix if present
      if (imageData.startsWith('data:image')) {
        imageData = imageData.split(',')[1];
      }

      // Write to file
      const buffer = Buffer.from(imageData, 'base64');
      fs.writeFileSync(OUTPUT_PATH, buffer);

      console.log('✅ Image generated and saved!');
      console.log(`   📁 File: ${OUTPUT_PATH}`);
      console.log(`   📊 Size: ${(buffer.length / 1024).toFixed(2)} KB\n`);

      console.log('🎯 Next Steps:');
      console.log(`   1. Open ${OUTPUT_PATH} to preview`);
      console.log('   2. If you like it, keep it and convert to SVG');
      console.log('   3. If not, adjust the prompt and run again:\n');
      console.log('   Example refinements:');
      console.log('   - "Make the jump more dramatic"');
      console.log('   - "Add more jade green accents"');
      console.log('   - "Shift to warmer, less cool tones"\n');
    } else {
      // Text response (description or feedback from Gemini)
      console.log('ℹ️  Gemini returned a text response (not an image).');
      console.log('   This might mean:');
      console.log('   - The image generation endpoint is unavailable');
      console.log('   - Gemini generated a description instead\n');
      console.log('💡 Try one of these:');
      console.log('   1. Use Gemini web interface directly (gemini.google.com)');
      console.log('   2. Check Gemini API docs for current image generation model');
      console.log('   3. Ask Gemini to refine the description further\n');

      // Save the response anyway for reference
      fs.writeFileSync(path.join(OUTPUT_DIR, 'gemini-response.txt'), responseText);
      console.log(`   📝 Response saved to ${OUTPUT_DIR}/gemini-response.txt\n`);
    }

  } catch (error) {
    console.error('❌ Error:');
    
    if (error.response?.status === 401) {
      console.error('   Invalid or expired API key.');
      console.error('   Get a new one at: https://aistudio.google.com/app/apikey\n');
    } else if (error.response?.status === 429) {
      console.error('   Rate limited. Wait a moment and try again.\n');
    } else if (error.response?.data?.error?.message) {
      console.error(`   ${error.response.data.error.message}\n`);
    } else {
      console.error(`   ${error.message}\n`);
    }

    if (error.response?.data) {
      console.error('📋 Full API response:');
      console.error(JSON.stringify(error.response.data, null, 2));
    }

    process.exit(1);
  }
}

// ============================================================================
// RUN
// ============================================================================

generateLogo();