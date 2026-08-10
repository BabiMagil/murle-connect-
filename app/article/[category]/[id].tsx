import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { getArticleById } from "@/utils/contentLoader";
import { useAppTheme } from "@/hooks/useAppTheme";
import { radii, spacing, typography } from "@/constants/theme";

export default function ArticleDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const router = useRouter();
  const theme = useAppTheme();

  const article = getArticleById(String(id));

  /*
   * ARTICLE NOT FOUND
   */
  if (!article) {
    return (
      <SafeAreaView
        style={[
          styles.safe,
          {
            backgroundColor: theme.background,
          },
        ]}
      >
        <View style={styles.errorContainer}>
          <Ionicons
            name="document-text-outline"
            size={48}
            color={theme.textMuted}
          />

          <Text
            style={[
              styles.errorTitle,
              {
                color: theme.text,
              },
            ]}
          >
            Article not found
          </Text>

          <TouchableOpacity
            onPress={() => router.back()}
            style={[
              styles.backButton,
              {
                backgroundColor: theme.primary,
              },
            ]}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  /*
   * SAFELY GET ARTICLE DATA
   */
  const title = article.title || "Untitled Article";
  const subtitle = article.subtitle || "";
  const category = article.category || "Article";
  const image = article.image || "";

  /*
   * RENDER ANY TEXT / ARRAY / OBJECT
   *
   * This makes the article flexible.
   */
  function TextBlock({
    text,
  }: {
    text: any;
  }) {
    if (
      text === null ||
      text === undefined ||
      text === ""
    ) {
      return null;
    }

    /*
     * ARRAY
     */
    if (Array.isArray(text)) {
      return (
        <View>
          {text.map((item, index) => (
            <TextBlock
              key={index}
              text={item}
            />
          ))}
        </View>
      );
    }

    /*
     * OBJECT
     */
    if (typeof text === "object") {
      return (
        <View>
          {Object.entries(text).map(
            ([key, value]: any) => (
              <View
                key={key}
                style={styles.genericObjectSection}
              >
                <Text
                  style={[
                    styles.genericHeading,
                    {
                      color: theme.text,
                    },
                  ]}
                >
                  {key}
                </Text>

                <TextBlock text={value} />
              </View>
            )
          )}
        </View>
      );
    }

    /*
     * NORMAL TEXT
     */
    return (
      <Text
        style={[
          styles.paragraph,
          {
            color: theme.text,
          },
        ]}
      >
        {String(text)}
      </Text>
    );
  }

  /*
   * RENDER ARTICLE BODY
   *
   * Handles the structure:
   *
   * body: [
   *   {
   *     heading: "...",
   *     paragraphs: [...]
   *   }
   * ]
   */
  function renderBody() {
    if (!article.body) {
      return null;
    }

    /*
     * Structured article body
     */
    if (Array.isArray(article.body)) {
      return (
        <View style={styles.bodyContainer}>
          {article.body.map(
            (section: any, index: number) => {
              /*
               * Section with heading + paragraphs
               */
              if (
                typeof section === "object" &&
                section !== null
              ) {
                const heading =
                  section.heading || "";

                const paragraphs =
                  section.paragraphs || [];

                return (
                  <View
                    key={index}
                    style={styles.articleSection}
                  >
                    {heading ? (
                      <Text
                        style={[
                          styles.articleHeading,
                          {
                            color: theme.text,
                          },
                        ]}
                      >
                        {heading}
                      </Text>
                    ) : null}

                    {Array.isArray(
                      paragraphs
                    )
                      ? paragraphs.map(
                          (
                            paragraph: any,
                            paragraphIndex: number
                          ) => (
                            <Text
                              key={
                                paragraphIndex
                              }
                              style={[
                                styles.articleParagraph,
                                {
                                  color:
                                    theme.text,
                                },
                              ]}
                            >
                              {String(
                                paragraph
                              )}
                            </Text>
                          )
                        )
                      : (
                          <Text
                            style={[
                              styles.articleParagraph,
                              {
                                color:
                                  theme.text,
                              },
                            ]}
                          >
                            {String(
                              paragraphs
                            )}
                          </Text>
                        )}
                  </View>
                );
              }

              /*
               * Normal text item
               */
              return (
                <Text
                  key={index}
                  style={[
                    styles.articleParagraph,
                    {
                      color: theme.text,
                    },
                  ]}
                >
                  {String(section)}
                </Text>
              );
            }
          )}
        </View>
      );
    }

    /*
     * Fallback for older article formats
     */
    return (
      <View style={styles.bodyContainer}>
        <TextBlock text={article.body} />
      </View>
    );
  }

  /*
   * TAGS
   */
  function renderTags() {
    if (
      !article.tags ||
      !Array.isArray(article.tags) ||
      article.tags.length === 0
    ) {
      return null;
    }

    return (
      <View style={styles.tagsSection}>
        <Text
          style={[
            styles.tagsHeading,
            {
              color: theme.text,
            },
          ]}
        >
          Tags
        </Text>

        <View style={styles.tagsContainer}>
          {article.tags.map(
            (tag: string, index: number) => (
              <View
                key={`${tag}-${index}`}
                style={[
                  styles.tag,
                  {
                    backgroundColor:
                      theme.primary + "15",
                    borderColor:
                      theme.primary + "35",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.tagText,
                    {
                      color: theme.primary,
                    },
                  ]}
                >
                  {tag}
                </Text>
              </View>
            )
          )}
        </View>
      </View>
    );
  }

  /*
   * HISTORICAL NOTE
   */
  function renderHistoricalNote() {
    if (!article.historicalNote) {
      return null;
    }

    return (
      <View
        style={[
          styles.noteBox,
          {
            backgroundColor:
              theme.surfaceAlt,
            borderLeftColor:
              theme.primary,
          },
        ]}
      >
        <View style={styles.noteHeader}>
          <Ionicons
            name="information-circle-outline"
            size={20}
            color={theme.primary}
          />

          <Text
            style={[
              styles.noteTitle,
              {
                color: theme.text,
              },
            ]}
          >
            Historical Note
          </Text>
        </View>

        <Text
          style={[
            styles.noteText,
            {
              color: theme.textMuted,
            },
          ]}
        >
          {article.historicalNote}
        </Text>
      </View>
    );
  }

  /*
   * REFERENCES
   */
  function renderReferences() {
    if (
      !article.references ||
      !Array.isArray(article.references) ||
      article.references.length === 0
    ) {
      return null;
    }

    return (
      <View style={styles.referencesSection}>
        <Text
          style={[
            styles.referencesHeading,
            {
              color: theme.text,
            },
          ]}
        >
          References
        </Text>

        {article.references.map(
          (
            reference: string,
            index: number
          ) => (
            <View
              key={index}
              style={styles.referenceRow}
            >
              <Text
                style={[
                  styles.referenceNumber,
                  {
                    color: theme.primary,
                  },
                ]}
              >
                {index + 1}.
              </Text>

              <Text
                style={[
                  styles.referenceText,
                  {
                    color: theme.textMuted,
                  },
                ]}
              >
                {reference}
              </Text>
            </View>
          )
        )}
      </View>
    );
  }

  return (
    <SafeAreaView
      style={[
        styles.safe,
        {
          backgroundColor:
            theme.background,
        },
      ]}
      edges={["top"]}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={
          styles.contentContainer
        }
        showsVerticalScrollIndicator={false}
      >
        {/* BACK BUTTON */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backRow}
          activeOpacity={0.7}
        >
          <Ionicons
            name="chevron-back"
            size={24}
            color={theme.text}
          />

          <Text
            style={[
              styles.backText,
              {
                color: theme.text,
              },
            ]}
          >
            Back
          </Text>
        </TouchableOpacity>

        {/* ARTICLE IMAGE */}
        {image ? (
          <Image
            source={{
              uri: image,
            }}
            style={styles.heroImage}
          />
        ) : null}

        {/* CATEGORY */}
        <Text
          style={[
            styles.category,
            {
              color: theme.primary,
            },
          ]}
        >
          {String(category).toUpperCase()}
        </Text>

        {/* TITLE */}
        <Text
          style={[
            styles.title,
            {
              color: theme.text,
            },
          ]}
        >
          {title}
        </Text>

        {/* SUBTITLE */}
        {subtitle ? (
          <Text
            style={[
              styles.subtitle,
              {
                color: theme.textMuted,
              },
            ]}
          >
            {subtitle}
          </Text>
        ) : null}

        {/* AUTHOR / DATE */}
        {(article.author ||
          article.publishedAt) && (
          <View
            style={[
              styles.metaContainer,
              {
                borderTopColor:
                  theme.border,
                borderBottomColor:
                  theme.border,
              },
            ]}
          >
            {article.author ? (
              <View style={styles.metaItem}>
                <Ionicons
                  name="person-outline"
                  size={15}
                  color={theme.textMuted}
                />

                <Text
                  style={[
                    styles.metaText,
                    {
                      color:
                        theme.textMuted,
                    },
                  ]}
                >
                  {article.author}
                </Text>
              </View>
            ) : null}

            {article.publishedAt ? (
              <View style={styles.metaItem}>
                <Ionicons
                  name="calendar-outline"
                  size={15}
                  color={theme.textMuted}
                />

                <Text
                  style={[
                    styles.metaText,
                    {
                      color:
                        theme.textMuted,
                    },
                  ]}
                >
                  {article.publishedAt}
                </Text>
              </View>
            ) : null}
          </View>
        )}

        {/* ARTICLE BODY */}
        {renderBody()}

        {/* TAGS */}
        {renderTags()}

        {/* HISTORICAL NOTE */}
        {renderHistoricalNote()}

        {/* REFERENCES */}
        {renderReferences()}

        {/* END OF ARTICLE */}
        <View
          style={[
            styles.endDivider,
            {
              backgroundColor:
                theme.border,
            },
          ]}
        />

        <Text
          style={[
            styles.endText,
            {
              color: theme.textMuted,
            },
          ]}
        >
          End of article
        </Text>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },

  container: {
    flex: 1,
  },

  contentContainer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xxl,
  },

  /*
   * BACK BUTTON
   */
  backRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
    paddingVertical: spacing.xs,
  },

  backText: {
    ...typography.body,
    marginLeft: 4,
    fontWeight: "600",
  },

  /*
   * HERO IMAGE
   */
  heroImage: {
    width: "100%",
    height: 240,
    borderRadius: radii.xl,
    marginBottom: spacing.lg,
  },

  /*
   * CATEGORY
   */
  category: {
    ...typography.label,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.2,
    marginBottom: spacing.sm,
  },

  /*
   * MAIN ARTICLE TITLE
   */
  title: {
    ...typography.title,
    fontSize: 30,
    lineHeight: 38,
    fontWeight: "800",
    marginBottom: spacing.sm,
  },

  /*
   * SUBTITLE
   */
  subtitle: {
    ...typography.body,
    fontSize: 17,
    lineHeight: 26,
    marginBottom: spacing.lg,
  },

  /*
   * AUTHOR / DATE
   */
  metaContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
    paddingVertical: spacing.md,
    borderTopWidth:
      StyleSheet.hairlineWidth,
    borderBottomWidth:
      StyleSheet.hairlineWidth,
    marginBottom: spacing.xl,
  },

  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  metaText: {
    ...typography.caption,
    fontSize: 12,
  },

  /*
   * BODY
   */
  bodyContainer: {
    width: "100%",
  },

  /*
   * ARTICLE SECTION
   */
  articleSection: {
    marginBottom: spacing.xl,
  },

  /*
   * REAL ARTICLE HEADING
   *
   * This is the heading from:
   *
   * "heading": "Introduction"
   */
  articleHeading: {
    fontSize: 22,
    lineHeight: 29,
    fontWeight: "800",
    marginBottom: spacing.md,
  },

  /*
   * REAL ARTICLE PARAGRAPH
   *
   * This is the text from:
   *
   * "paragraphs": [...]
   */
  articleParagraph: {
    fontSize: 16,
    lineHeight: 28,
    fontWeight: "400",
    marginBottom: spacing.md,
  },

  /*
   * FALLBACK PARAGRAPH
   */
  paragraph: {
    fontSize: 16,
    lineHeight: 28,
    fontWeight: "400",
    marginBottom: spacing.md,
  },

  /*
   * OBJECT FALLBACK HEADING
   */
  genericHeading: {
    fontSize: 20,
    lineHeight: 27,
    fontWeight: "800",
    marginBottom: spacing.sm,
  },

  genericObjectSection: {
    marginBottom: spacing.lg,
  },

  /*
   * TAGS
   */
  tagsSection: {
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },

  tagsHeading: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: spacing.md,
  },

  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },

  tag: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    borderWidth:
      StyleSheet.hairlineWidth,
  },

  tagText: {
    fontSize: 12,
    fontWeight: "700",
  },

  /*
   * HISTORICAL NOTE
   */
  noteBox: {
    borderLeftWidth: 4,
    borderRadius: radii.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },

  noteHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginBottom: spacing.sm,
  },

  noteTitle: {
    fontSize: 17,
    fontWeight: "800",
  },

  noteText: {
    fontSize: 14,
    lineHeight: 23,
  },

  /*
   * REFERENCES
   */
  referencesSection: {
    marginBottom: spacing.xl,
  },

  referencesHeading: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: spacing.md,
  },

  referenceRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: spacing.sm,
  },

  referenceNumber: {
    width: 24,
    fontSize: 14,
    fontWeight: "800",
  },

  referenceText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 22,
  },

  /*
   * END OF ARTICLE
   */
  endDivider: {
    height: StyleSheet.hairlineWidth,
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },

  endText: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "600",
  },

  /*
   * ERROR
   */
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xl,
  },

  errorTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },

  backButton: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: radii.lg,
  },

  backButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },

  bottomSpace: {
    height: 40,
  },
});
