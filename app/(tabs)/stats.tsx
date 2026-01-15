// app/(tabs)/stats.tsx
import NavigationArrows from '@/components/mini-games/NavigationArrows';
import { ThemedText } from '@/components/themed-text';
import { useHippo } from '@/context/HippoContext';
import { useState } from 'react';
import { Image, ImageBackground, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';

const statsBg = require('@/screens/stat/stat_background.png');
const titleImg = require('@/models/icons/stats/title.png');
const frameImg = require('@/models/icons/stats/frame.png');
const smallFrame = require('@/models/icons/stats/small_frame.png');
const bigFrame = require('@/models/icons/stats/big frame.png');
const mediumFrame = require('@/models/icons/stats/medium_frame.png');
const rewardsButtonImg = require('@/models/icons/stats/rewards_button.png');
const hippoImg = require('@/models/icons/stats/hippo.png');

// Иконки
const healthIcon = require('@/models/icons/stats/health.png');
const satietyIcon = require('@/models/icons/stats/hunger.png');
const moodIcon = require('@/models/icons/stats/mood.png');
const cleanIcon = require('@/models/icons/stats/clean.png');
const energyIcon = require('@/models/icons/stats/energy.png');
const knowledgeIcon = require('@/models/icons/stats/knowledge.png');
const feedIcon = require('@/models/icons/stats/feed.png');
const playIcon = require('@/models/icons/stats/play.png');
const sleepIcon = require('@/models/icons/stats/sleep.png');
const maleIcon = require('@/models/icons/stats/male.png');
const femaleIcon = require('@/models/icons/stats/female.png');
const moneyIcon = require('@/models/icons/stats/money.png');

// Иконки игр
const bubbleIcon = require('@/models/icons/games/bubble_icon.png');
const cardIcon = require('@/models/icons/games/cards/back.png');
const diceIcon = require('@/models/icons/games/number icon.png');
const brainIcon = require('@/models/icons/games/brain.png');

// Иконка рекорда
const successIcon = require('@/models/icons/stats/succes.png');

// Иконки для модалей
const homeIcon = require('@/models/icons/games/home.png');

// Масштабирующий коэффициент для веб (1 для мобилов, больше для веб)
const SCALE = 1;

export default function StatsScreen() {
    const { hippo } = useHippo();
    const [rewardsModalVisible, setRewardsModalVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    
    // Функция для масштабирования размеров
    const scale_size = (size: number) => Math.round(size * SCALE);

    if (!hippo) {
        return <View style={styles.container} />;
    }

    const handlePrevious = () => {
        if (currentPage > 0) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < 2) setCurrentPage(currentPage + 1);
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={statsBg} style={styles.background} resizeMode="stretch">
                {/* TITLE */}
                <Image source={titleImg} style={[styles.title, { paddingTop: scale_size(100), height: scale_size(100), marginBottom: scale_size(-120) }]} />

                {/* MAIN FRAME */}
                <ImageBackground source={frameImg} style={[styles.mainFrame, { margin: scale_size(10) }]} resizeMode="stretch">
                    <View style={[styles.frameContent, { padding: scale_size(50) }]}>
                        {/* TOP ROW: REWARDS + INFO (только на первой странице) */}
                        {currentPage === 0 && (
                            <View style={[styles.topSectionPage0, { gap: scale_size(8), marginBottom: scale_size(10), marginTop: scale_size(50) }]}>
                                <TouchableOpacity style={styles.rewardsBtnContainer} onPress={() => setRewardsModalVisible(true)}>
                                    <Image source={rewardsButtonImg} style={[styles.rewardsBtnImage, { width: scale_size(130), height: scale_size(130), marginBottom: scale_size(-40), marginLeft: scale_size(60), marginTop: scale_size(-40) }]} />
                                </TouchableOpacity>

                                <ImageBackground source={smallFrame} style={[styles.infoBoxPage0, { height: scale_size(50), marginBottom: scale_size(10) }]} resizeMode="stretch">
                                    <View style={[styles.infoBoxContentPage0, { paddingHorizontal: scale_size(12), gap: scale_size(20) }]}>
                                        <Image source={hippo.gender === 'male' ? maleIcon : femaleIcon} style={[styles.genderIconPage0, { width: scale_size(32), height: scale_size(32) }]} />
                                        <ThemedText style={[styles.infoTextPage0, { fontSize: scale_size(12) }]}>{hippo.name}</ThemedText>
                                        <ThemedText style={[styles.infoTextPage0, { fontSize: scale_size(12) }]}>{hippo.age === 'child' ? 'Малыш' : 'Взрослый'}</ThemedText>
                                    </View>
                                </ImageBackground>
                            </View>
                        )}

                        {/* MAIN CONTENT - PAGE 0: INDICATORS ONLY */}
                        {currentPage === 0 && (
                            <View style={[styles.mainContent, { gap: scale_size(10) }]}>
                                <View style={styles.fullWidthFrame}>
                                    <ImageBackground source={bigFrame} style={[styles.bigFrameBox, { padding: scale_size(8), marginBottom: scale_size(70), marginTop: scale_size(-20) }]} resizeMode="stretch">
                                        <View style={[styles.bigFrameContent, { marginBottom: scale_size(5) }]}>
                                            <ThemedText style={[styles.sectionTitleHeader, { fontSize: scale_size(16), marginBottom: scale_size(12) }]}>Показатели</ThemedText>
                                            <View style={styles.statsGrid}>
                                                <StatRow icon={healthIcon} label="Здоровье" value={Math.round(hippo.stats.health)} color="#FF6B6B" scale_size={scale_size} />
                                                <StatRow icon={satietyIcon} label="Сытость" value={Math.round(hippo.stats.satiety)} color="#FFB84D" scale_size={scale_size} />
                                                <StatRow icon={moodIcon} label="Настроение" value={Math.round(hippo.stats.happiness)} color="#4ECDC4" scale_size={scale_size} />
                                                <StatRow icon={cleanIcon} label="Чистота" value={Math.round(hippo.stats.cleanliness)} color="#95E1D3" scale_size={scale_size} />
                                                <StatRow icon={energyIcon} label="Энергия" value={Math.round(hippo.stats.energy)} color="#FFD966" scale_size={scale_size} />
                                                <StatRow icon={knowledgeIcon} label="Знания" value={Math.round(hippo.stats.thirst)} color="#87CEEB" scale_size={scale_size} />
                                            </View>
                                        </View>
                                    </ImageBackground>
                                </View>
                            </View>
                        )}

                        {/* PAGE 1: ACTIVITY */}
                        {currentPage === 1 && (
                            <View style={[styles.mainContent, { gap: scale_size(10) }]}>
                                <View style={styles.fullWidthFrame}>
                                    <ImageBackground source={mediumFrame} style={[styles.mediumFrameBoxPage, { padding: scale_size(12), marginBottom: scale_size(70), marginTop: scale_size(60) }]} resizeMode="stretch">
                                        <View style={styles.mediumFrameContentPage}>
                                            <ThemedText style={[styles.sectionTitleHeaderPage1, { fontSize: scale_size(24), marginBottom: scale_size(12), marginTop: scale_size(20) }]}>Активность</ThemedText>
                                            <View style={styles.activityGridPage}>
                                                <ActivityRowPage icon={feedIcon} label="Покормлен" value={hippo.feedCount || 0} scale_size={scale_size} />
                                                <ActivityRowPage icon={playIcon} label="Поиграл" value={hippo.playCount || 0} scale_size={scale_size} />
                                                <ActivityRowPage icon={cleanIcon} label="Помыт" value={hippo.cleanCount || 0} scale_size={scale_size} />
                                                <ActivityRowPage icon={sleepIcon} label="Поспал" value={hippo.sleepCount || 0} scale_size={scale_size} />
                                            </View>
                                        </View>
                                    </ImageBackground>
                                </View>
                            </View>
                        )}

                        {/* PAGE 2: ACHIEVEMENTS */}
                        {currentPage === 2 && (
                            <View style={[styles.mainContent, { gap: scale_size(10) }]}>
                                <View style={styles.fullWidthFrame}>
                                    <ImageBackground source={bigFrame} style={[styles.bigFrameBoxPage, { padding: scale_size(12), marginBottom: scale_size(70), marginTop: scale_size(90) }]} resizeMode="stretch">
                                        <View style={styles.bigFrameContentPage}>
                                            <ThemedText style={[styles.sectionTitleHeaderPage2, { fontSize: scale_size(16), marginBottom: scale_size(20) }]}>Достижения</ThemedText>
                                            <View style={styles.achievementsGridPage}>
                                                <AchievementRowPage icon={bubbleIcon} label="Пузыри" plays={hippo.gameStats.bubbleGamePlays} record={hippo.gameStats.bubbleGameRecord} scale_size={scale_size} />
                                                <AchievementRowPage icon={cardIcon} label="Память" plays={hippo.gameStats.memoryGamePlays} scale_size={scale_size} />
                                                <AchievementRowPage icon={diceIcon} label="Кубики" plays={hippo.gameStats.thirdGamePlays} scale_size={scale_size} />
                                                <AchievementRowPage icon={brainIcon} label="Всего игр" plays={hippo.gameStats.totalGamePlays} scale_size={scale_size} />
                                                <AchievementRowPage icon={moneyIcon} label="Заработано" plays={hippo.gameStats.totalCoinsEarned} scale_size={scale_size} />
                                            </View>
                                        </View>
                                    </ImageBackground>
                                </View>
                            </View>
                        )}
                    </View>

                    {/* HIPPO - FRONT LAYER */}
                    <Image source={hippoImg} style={[styles.hippo, { bottom: scale_size(-80), left: scale_size(-20), width: scale_size(220), height: scale_size(220) }]} />
                </ImageBackground>

                {/* NAVIGATION ARROWS */}
                <NavigationArrows
                    onPrevious={handlePrevious}
                    onNext={handleNext}
                    canGoPrevious={currentPage > 0}
                    canGoNext={currentPage < 2}
                />
            </ImageBackground>

            {/* REWARDS MODAL */}
            <Modal visible={rewardsModalVisible} transparent animationType="fade" onRequestClose={() => setRewardsModalVisible(false)}>
                <View style={styles.modalOverlay}>
                    <ImageBackground source={smallFrame} style={[styles.modalFrame, { width: '100%', aspectRatio: 0.9 }]} resizeMode="stretch">
                        <View style={styles.modalContent}>
                            <ThemedText style={[styles.modalTitle, { fontSize: scale_size(24) }]}>Награды</ThemedText>
                            <ThemedText style={[styles.modalText, { fontSize: scale_size(16) }]}>Наград еще нет(((</ThemedText>
                            <TouchableOpacity style={styles.modalCloseBtn} onPress={() => setRewardsModalVisible(false)}>
                                <Image source={homeIcon} style={styles.modalCloseIcon} />
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>
            </Modal>
        </View>
    );
}

function StatRow({ icon, label, value, color, scale_size }: any) {
    return (
        <View style={[styles.statRow, { gap: scale_size(1) }]}>
            <Image source={icon} style={[styles.rowIcon, { width: scale_size(32), height: scale_size(32) }]} />
            <View style={styles.rowInfo}>
                <ThemedText style={[styles.rowLabel, { fontSize: scale_size(9), marginBottom: scale_size(2) }]}>{label}</ThemedText>
                <View style={[styles.progressBar, { height: scale_size(4), marginTop: scale_size(-5) }]}>
                    <View style={[styles.progressFill, { width: `${value}%`, backgroundColor: color }]} />
                </View>
            </View>
            <ThemedText style={[styles.rowValue, { fontSize: scale_size(9), marginLeft: scale_size(10), marginRight: scale_size(10) }]}>{value}%</ThemedText>
        </View>
    );
}

function ActivityRowPage({ icon, label, value, scale_size }: any) {
    return (
        <View style={[styles.activityRowPage, { gap: scale_size(8) }]}>
            <Image source={icon} style={[styles.actIconPage, { width: scale_size(48), height: scale_size(48) }]} />
            <ThemedText style={[styles.actLabelPage, { fontSize: scale_size(16) }]}>{label}</ThemedText>
            <ThemedText style={[styles.actValuePage, { fontSize: scale_size(18), marginRight: scale_size(10) }]}>{value}</ThemedText>
        </View>
    );
}

function AchievementRowPage({ icon, label, plays, record, scale_size }: any) {
    return (
        <View>
            <View style={[styles.achievementRowPage, { gap: scale_size(12) }]}>
                <Image source={icon} style={[styles.achievementIconPage, { width: scale_size(36), height: scale_size(36), marginTop: scale_size(2) }]} />
                <View style={styles.achievementTextContainer}>
                    <ThemedText style={[styles.achievementLabelPage, { fontSize: scale_size(16), marginTop: scale_size(5) }]}>{label}</ThemedText>
                </View>
                <ThemedText style={[styles.achievementValuePage, { fontSize: scale_size(18), marginTop: scale_size(5), marginRight: scale_size(10) }]}>{plays}</ThemedText>
            </View>
            {record !== undefined && (
                <View style={[styles.achievementRecordRow, { gap: scale_size(12), marginTop: scale_size(2), marginRight: scale_size(10) }]}>
                    <Image source={successIcon} style={[styles.recordIconPage, { width: scale_size(36), height: scale_size(36), marginBottom: scale_size(1), marginTop: scale_size(10) }]} />
                    <View style={styles.achievementTextContainer}>
                        <ThemedText style={[styles.achievementRecordLabelPage, { fontSize: scale_size(16) }]}>Рекорд</ThemedText>
                    </View>
                    <ThemedText style={[styles.achievementRecordValuePage, { fontSize: scale_size(18) }]}>{record}</ThemedText>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
    },
    background: {
        flex: 1,
    },
    title: {
        width: '100%',
        resizeMode: 'contain',
        zIndex: 5,
    },
    mainFrame: {
        flex: 1,
        marginTop: 0,
    },
    frameContent: {
        flex: 1,
    },
    topSectionPage0: {
        flexDirection: 'column',
        marginBottom: 10,
    },
    rewardsBtnContainer: {
        alignSelf: 'flex-start',
    },
    rewardsBtnImage: {
        resizeMode: 'contain',
    },
    infoBoxPage0: {
        justifyContent: 'center',
    },
    infoBoxContentPage0: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    genderIconPage0: {
        resizeMode: 'contain',
    },
    infoTextPage0: {
        color: '#7A4A1F',
        fontFamily: 'Comic Sans MS',
        fontWeight: 'bold',
    },
    mainContent: {
        flex: 1,
        flexDirection: 'row',
    },
    fullWidthFrame: {
        flex: 1,
    },
    bigFrameBox: {
        flex: 1,
    },
    bigFrameContent: {
        flex: 1,
    },
    sectionTitleHeader: {
        color: '#FFE4A1',
        fontFamily: 'Comic Sans MS',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    statsGrid: {
        flex: 1,
        justifyContent: 'space-around',
    },
    statRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowIcon: {
        resizeMode: 'contain',
    },
    rowInfo: {
        flex: 1,
    },
    rowLabel: {
        color: '#7A4A1F',
        fontFamily: 'Comic Sans MS',
        fontWeight: 'bold',
    },
    progressBar: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: 2,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
    },
    rowValue: {
        color: '#1a1a1a',
        fontFamily: 'Comic Sans MS',
        fontWeight: 'bold',
        textAlign: 'right',
    },
    mediumFrameBoxPage: {
        flex: 1,
    },
    mediumFrameContentPage: {
        flex: 1,
    },
    sectionTitleHeaderPage1: {
        color: '#FFE4A1',
        fontFamily: 'Comic Sans MS',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    activityGridPage: {
        flex: 1,
        justifyContent: 'space-around',
    },
    activityRowPage: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actIconPage: {
        resizeMode: 'contain',
    },
    actLabelPage: {
        color: '#7A4A1F',
        fontFamily: 'Comic Sans MS',
        fontWeight: 'bold',
        flex: 1,
    },
    actValuePage: {
        color: '#1a1a1a',
        fontFamily: 'Comic Sans MS',
        fontWeight: 'bold',
    },
    bigFrameBoxPage: {
        flex: 1,
    },
    bigFrameContentPage: {
        flex: 1,
    },
    sectionTitleHeaderPage2: {
        color: '#FFE4A1',
        fontFamily: 'Comic Sans MS',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    achievementsGridPage: {
        flex: 1,
        justifyContent: 'space-around',
    },
    achievementRowPageContainer: {
        marginVertical: 0,
    },
    achievementRowPage: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    achievementIconPage: {
        resizeMode: 'contain',
    },
    achievementTextContainer: {
        flex: 1,
    },
    achievementLabelPage: {
        color: '#7A4A1F',
        fontFamily: 'Comic Sans MS',
        fontWeight: 'bold',
    },
    achievementValuePage: {
        color: '#1a1a1a',
        fontFamily: 'Comic Sans MS',
        fontWeight: 'bold',
    },
    achievementRecordRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    recordIconPage: {
        resizeMode: 'contain',
    },
    achievementRecordLabelPage: {
        color: '#7A4A1F',
        fontFamily: 'Comic Sans MS',
        fontWeight: 'bold',
    },
    achievementRecordValuePage: {
        color: '#1a1a1a',
        fontFamily: 'Comic Sans MS',
        fontWeight: 'bold',
    },
    achievementRecordPage: {
        color: '#FFD700',
        fontFamily: 'Comic Sans MS',
        fontWeight: 'bold',
    },
    hippo: {
        position: 'absolute',
        resizeMode: 'contain',
        zIndex: 100,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalFrame: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    modalTitle: {
        color: '#7A4A1F',
        fontFamily: 'Comic Sans MS',
        fontWeight: 'bold',
    },
    modalText: {
        color: '#7A4A1F',
        fontFamily: 'Comic Sans MS',
    },
    modalCloseBtn: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalCloseIcon: {
        width: 210,
        height: 210,
        resizeMode: 'contain',
    },
    closeBtn: {
        backgroundColor: '#A65437',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 6,
    },
    closeBtnText: {
        color: '#fff',
        fontFamily: 'Comic Sans MS',
        fontWeight: 'bold',
    },
});
